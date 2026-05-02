import { defaultTaxonomy } from "./data/taxonomy-data.js";

const TAXONOMY_JSON_URL = "./data/taxonomy.json";
const TAXONOMY_API_URL = "./taxonomy.php";

const view = document.getElementById("view");
const breadcrumb = document.getElementById("breadcrumb");
const editorForm = document.getElementById("editor-form");
const parentSelect = document.getElementById("parent-id");
const nodeTypeSelect = document.getElementById("node-type");
const rankInput = document.getElementById("rank");
const rankField = rankInput?.closest("label");
const leafFields = document.getElementById("leaf-fields");
const exportButton = document.getElementById("export-button");
const fileStatus = document.getElementById("file-status");
const leafFieldTemplate = document.getElementById("leaf-field-template");
const speciesExtra = document.getElementById("species-extra");
const openEditorLink = document.getElementById("open-editor-link");
const openBrowseLink = document.getElementById("open-browse-link");
const deleteForm = document.getElementById("delete-form");
const editNodeSelect = document.getElementById("edit-node-id");
const loadEntryButton = document.getElementById("load-entry-button");
const cancelEditButton = document.getElementById("cancel-edit-button");
const deleteNodeSelect = document.getElementById("delete-node-id");
const deleteButton = deleteForm?.querySelector("button[type='submit']");
const submitButton = document.getElementById("submit-button");
const DEFAULT_IMAGE = "./img/default.jpg";
const NEXT_TAXON_RANK = {
  class: "order",
  order: "family",
  family: "genus"
};
const speciesImageCache = new Map();
const speciesPrimaryImageCache = new Map();
const nodeRepresentativeImageCache = new Map();
const browseSearchState = {
  scopeId: null,
  query: ""
};
const editorState = {
  editingNodeId: null
};

let taxonomy;

async function bootstrap() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  taxonomy = await loadTaxonomy();
  await refreshImageCatalog();
  hydrateEditor();
  bindEvents();
  syncCrossLinks();
  updateFileStatus();
  syncRoute();
}

async function loadTaxonomy() {
  const apiTaxonomy = await loadTaxonomyFromApi();

  if (apiTaxonomy) {
    return ensureTopology(apiTaxonomy);
  }

  const bundledTaxonomy = await loadBundledTaxonomy();

  if (bundledTaxonomy) {
    return ensureTopology(bundledTaxonomy);
  }

  return ensureTopology(structuredClone(defaultTaxonomy));
}

async function persistTaxonomy() {
  clearStoredNodeImages(taxonomy);

  if (await saveTaxonomyToApi()) {
    await refreshImageCatalog();
    return true;
  }

  updateFileStatus("Save failed. Start the app through PHP so edits can write to data/taxonomy.json.");
  alert("Save failed. Serve the app through PHP so edits can write to data/taxonomy.json.");
  return false;
}

function bindEvents() {
  window.addEventListener("hashchange", () => syncRoute());

  exportButton?.addEventListener("click", exportTaxonomy);

  nodeTypeSelect?.addEventListener("change", renderEditorFields);
  parentSelect?.addEventListener("change", renderEditorFields);
  loadEntryButton?.addEventListener("click", () => {
    if (editNodeSelect?.value) {
      loadNodeIntoEditor(editNodeSelect.value);
    }
  });
  cancelEditButton?.addEventListener("click", () => {
    resetEditorForm();
  });

  editorForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await createNodeFromForm();
  });

  deleteForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await deleteNodeFromForm();
  });
}

function syncRoute() {
  const route = location.hash.slice(1) || "/browse";
  const [, section, nodeId] = route.split("/");

  syncCrossLinks();

  if (section === "node" && nodeId && taxonomy.nodes[nodeId]) {
    scrollToTop();
    renderNodeView(nodeId);
    syncEditorSelections(nodeId);
    return;
  }

  scrollToTop();
  renderBrowseHome();
  syncEditorSelections();
}

function renderBrowseHome() {
  const rootId = taxonomy.meta.rootId;
  const rootNode = taxonomy.nodes[rootId];
  const children = getSortedChildren(rootId);

  setBrowseSearchScope(rootId);
  renderBreadcrumb([rootNode]);
  renderTaxonCards(
    rootId,
    children,
    taxonomy.meta.sourceNote || "Choose the first branch of the taxonomy."
  );
}

function renderNodeView(nodeId) {
  const node = taxonomy.nodes[nodeId];
  const children = getSortedChildren(nodeId);
  const lineage = buildLineage(nodeId);

  renderBreadcrumb(lineage);

  if (node.type === "species") {
    setBrowseSearchScope(null);
    renderSpecies(node, lineage);
  } else {
    renderTaxon(node, children);
  }
}

function buildLineage(nodeId) {
  const lineage = [];
  let currentId = nodeId;

  while (currentId) {
    const node = taxonomy.nodes[currentId];

    if (!node) {
      break;
    }

    lineage.unshift(node);
    currentId = taxonomy.parents[currentId];
  }

  return lineage;
}

function renderBreadcrumb(lineage) {
  breadcrumb.innerHTML = "";

  lineage.forEach((node, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = node.label;
    button.addEventListener("click", () => {
      location.hash = `#/node/${node.id}`;
    });
    breadcrumb.append(button);

    if (index < lineage.length - 1) {
      const separator = document.createElement("span");
      separator.textContent = "›";
      breadcrumb.append(separator);
    }
  });
}

function getSortedChildren(nodeId) {
  const childIds = taxonomy.children[nodeId] || [];
  return childIds
    .map((id) => taxonomy.nodes[id])
    .filter(Boolean)
    .sort((left, right) => left.label.localeCompare(right.label));
}

function renderTaxon(node, children) {
  setBrowseSearchScope(node.id);
  const heading = `
    <section class="view-heading view-heading--hero">
      <div class="image-copy-box">
        <p class="eyebrow">${escapeHtml(node.rank)}</p>
        <h2>${escapeHtml(node.label)}</h2>
        <p class="summary">${escapeHtml(node.summary || "No summary yet.")}</p>
      </div>
    </section>
  `;

  renderTaxonCards(node.id, children, "", heading);
}

function renderTaxonCards(scopeId, children, intro = "", heading = "") {
  const scopeNode = taxonomy.nodes[scopeId];
  const scopeLabel = scopeNode?.label || "this branch";
  const hasChildren = children.length > 0;
  const query = browseSearchState.scopeId === scopeId ? browseSearchState.query : "";
  const searchSection = hasChildren
    ? `
        <section class="branch-search">
          <label class="branch-search__field">
            <span class="branch-search__label">Search direct children</span>
            <input
              type="search"
              data-branch-search
              placeholder="Filter ${escapeHtml(scopeLabel)} children"
              value="${escapeHtml(query)}"
              autocomplete="off"
              spellcheck="false"
            />
          </label>
          <p class="branch-search__status" data-branch-search-status></p>
        </section>
      `
    : "";
  view.innerHTML = `
    ${heading}
    ${
      intro
        ? `
          <section class="browse-intro">
            <div class="image-copy-box">
              <p class="summary">${escapeHtml(intro)}</p>
            </div>
          </section>
        `
        : ""
    }
    ${searchSection}
    <section class="card-grid" data-card-grid></section>
    <div class="empty-state hidden" data-branch-empty-state></div>
  `;

  const searchInput = view.querySelector("[data-branch-search]");

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      browseSearchState.query = event.target.value;
      renderBranchCardResults(scopeId, children);
    });
  }

  renderBranchCardResults(scopeId, children);
}

function renderSpecies(node, lineage) {
  const profileCards = taxonomy.meta.leafTemplate
    .map((field) => {
      const value = node.profile?.[field.key] || "To be filled";
      return `
        <article class="detail-card">
          <h3>${escapeHtml(field.label)}</h3>
          <p>${escapeHtml(value)}</p>
        </article>
      `;
    })
    .join("");

  const classification = lineage
    .slice(0, -1)
    .map((item) => item.label)
    .join(" / ");
  const initialImage = getSpeciesInitialImage(node);

  view.innerHTML = `
    <section class="species-layout">
      <article class="species-hero">
        <div class="image-copy-box">
          <p class="eyebrow">${escapeHtml(node.rank)}</p>
          <h2>${escapeHtml(node.label)}</h2>
          <p class="summary">${escapeHtml(node.summary || "No summary yet.")}</p>
          <div class="species-meta">
            <span>${escapeHtml(classification || "Root")}</span>
            <span>${escapeHtml(node.profile?.status || "Status pending")}</span>
          </div>
        </div>
        <section class="species-gallery" data-species-gallery="${node.id}">
          <button class="gallery-button" type="button" data-gallery-action="prev" aria-label="Previous image">
            ‹
          </button>
          <div class="species-gallery__frame">
            <img
              class="species-gallery__image"
              src="${escapeHtml(initialImage)}"
              alt="${escapeHtml(node.label)}"
            />
          </div>
          <button class="gallery-button" type="button" data-gallery-action="next" aria-label="Next image">
            ›
          </button>
          <p class="species-gallery__status">1 / 1</p>
        </section>
      </article>
      <section class="detail-grid">${profileCards}</section>
      <article class="notes-card">
        <h3>Notes</h3>
        <p>${escapeHtml(node.notes || "Add notes for behavior, breeding, migration, or your own observations.")}</p>
      </article>
    </section>
  `;

  initializeSpeciesGallery(node);
}

function hydrateEditor() {
  if (!editorForm || !parentSelect || !nodeTypeSelect || !leafFields || !speciesExtra) {
    return;
  }

  populateParentOptions();
  populateEditOptions();
  populateDeleteOptions();
  renderEditorFields();
  syncEditorSelections(getRouteNodeId());
}

function populateParentOptions() {
  if (!parentSelect) {
    return;
  }

  const options = Object.values(taxonomy.nodes)
    .filter((node) => node.type === "taxon")
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(
      (node) =>
        `<option value="${node.id}">${escapeHtml(node.label)} (${escapeHtml(node.rank)})</option>`
    )
    .join("");

  parentSelect.innerHTML = options;
}

function populateDeleteOptions() {
  if (!deleteNodeSelect) {
    return;
  }

  const options = Object.values(taxonomy.nodes)
    .filter((node) => node.id !== taxonomy.meta.rootId)
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(
      (node) =>
        `<option value="${node.id}">${escapeHtml(node.label)} (${escapeHtml(node.rank)})</option>`
    )
    .join("");

  deleteNodeSelect.innerHTML = options;
  if (deleteButton) {
    deleteButton.disabled = !options;
  }
}

function populateEditOptions() {
  if (!editNodeSelect) {
    return;
  }

  const options = Object.values(taxonomy.nodes)
    .filter((node) => node.id !== taxonomy.meta.rootId)
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(
      (node) =>
        `<option value="${node.id}">${escapeHtml(node.label)} (${escapeHtml(node.rank)})</option>`
    )
    .join("");

  editNodeSelect.innerHTML = `<option value="">Select an entry</option>${options}`;
}

function syncEditorSelections(nodeId = null) {
  const context = resolveEditorContext(nodeId);

  if (parentSelect && hasSelectOption(parentSelect, context.parentId)) {
    parentSelect.value = context.parentId;
  }

  if (
    deleteNodeSelect &&
    context.deleteId &&
    hasSelectOption(deleteNodeSelect, context.deleteId)
  ) {
    deleteNodeSelect.value = context.deleteId;
  }

  if (editNodeSelect) {
    if (editorState.editingNodeId && hasSelectOption(editNodeSelect, editorState.editingNodeId)) {
      editNodeSelect.value = editorState.editingNodeId;
    } else if (nodeId && hasSelectOption(editNodeSelect, nodeId)) {
      editNodeSelect.value = nodeId;
    } else {
      editNodeSelect.value = "";
    }
  }

  renderEditorFields();
}

function resolveEditorContext(nodeId) {
  const rootId = taxonomy.meta.rootId;
  const node = nodeId ? taxonomy.nodes[nodeId] : null;

  if (!node) {
    return {
      parentId: rootId,
      deleteId: ""
    };
  }

  if (node.type === "taxon") {
    return {
      parentId: node.id,
      deleteId: node.id === rootId ? "" : node.id
    };
  }

  const branchId = taxonomy.parents[node.id] || rootId;
  return {
    parentId: branchId,
    deleteId: branchId === rootId ? "" : branchId
  };
}

function hasSelectOption(selectElement, value) {
  return Array.from(selectElement.options).some((option) => option.value === value);
}

function renderEditorFields() {
  if (
    !leafFields ||
    !speciesExtra ||
    !nodeTypeSelect ||
    !leafFieldTemplate ||
    !parentSelect ||
    !rankInput
  ) {
    return;
  }

  const parentNode = taxonomy.nodes[parentSelect.value];
  const allowsBranch = parentNode?.type === "taxon" && parentNode.rank !== "genus";
  const branchOption = nodeTypeSelect.querySelector("option[value='taxon']");

  if (branchOption) {
    branchOption.disabled = !allowsBranch;
  }

  if (!allowsBranch && nodeTypeSelect.value === "taxon") {
    nodeTypeSelect.value = "species";
  }

  leafFields.innerHTML = "";
  const isSpecies = nodeTypeSelect.value === "species";
  const derivedRank = deriveRank(parentSelect.value, nodeTypeSelect.value);
  const isEditing = Boolean(editorState.editingNodeId);

  speciesExtra.classList.toggle("hidden", !isSpecies);
  if (rankField) {
    rankField.classList.remove("hidden");
  }
  rankInput.value = derivedRank;
  rankInput.readOnly = true;
  nodeTypeSelect.disabled = isEditing;
  if (submitButton) {
    submitButton.textContent = isEditing ? "Save Changes" : "Add to Taxonomy";
  }
  if (cancelEditButton) {
    cancelEditButton.classList.toggle("hidden", !isEditing);
  }

  if (!isSpecies) {
    return;
  }

  taxonomy.meta.leafTemplate.forEach((field) => {
    const fragment = leafFieldTemplate.content.cloneNode(true);
    const wrapper = fragment.querySelector(".dynamic-field");
    const label = fragment.querySelector("span");
    const input = fragment.querySelector("input");

    label.textContent = field.label;
    input.name = field.key;
    input.placeholder = field.label;
    wrapper.dataset.key = field.key;

    leafFields.append(fragment);
  });
}

async function createNodeFromForm() {
  if (editorState.editingNodeId) {
    await updateNodeFromForm();
    return;
  }

  if (!editorForm || !nodeTypeSelect) {
    return;
  }

  const formData = new FormData(editorForm);
  const label = formData.get("label").trim();
  const type = formData.get("nodeType");
  const parentId = formData.get("parentId");
  const rank = deriveRank(parentId, type);

  if (!label || !rank || !parentId) {
    return;
  }

  const id = slugify(label);

  if (taxonomy.nodes[id]) {
    alert("An entry with that name already exists. Use a distinct label.");
    return;
  }

  const previousTaxonomy = structuredClone(taxonomy);
  const baseNode = {
    id,
    type,
    label,
    rank,
    summary: formData.get("summary").trim()
  };
  let targetParentId = parentId;

  if (type === "species") {
    baseNode.profile = Object.fromEntries(
      taxonomy.meta.leafTemplate.map((field) => [
        field.key,
        formData.get(field.key)?.trim() || ""
      ])
    );
    baseNode.notes = formData.get("notes")?.trim() || "";
    targetParentId = resolveSpeciesParentId(
      taxonomy,
      parentId,
      baseNode.profile.scientificName
    );
  }

  taxonomy.nodes[id] = baseNode;
  taxonomy.children[targetParentId] ||= [];
  taxonomy.children[targetParentId].push(id);
  taxonomy.children[targetParentId].sort((leftId, rightId) =>
    taxonomy.nodes[leftId].label.localeCompare(taxonomy.nodes[rightId].label)
  );
  taxonomy.parents[id] = targetParentId;
  if (!(await persistTaxonomy())) {
    taxonomy = previousTaxonomy;
    hydrateEditor();
    syncCrossLinks();
    syncRoute();
    return;
  }
  populateParentOptions();
  populateEditOptions();
  populateDeleteOptions();
  resetEditorForm(false);
  syncCrossLinks();
  location.hash = `#/node/${id}`;
}

async function updateNodeFromForm() {
  if (!editorForm || !editorState.editingNodeId) {
    return;
  }

  const nodeId = editorState.editingNodeId;
  const existingNode = taxonomy.nodes[nodeId];

  if (!existingNode) {
    resetEditorForm();
    return;
  }

  const formData = new FormData(editorForm);
  const label = formData.get("label").trim();
  const parentId = formData.get("parentId");
  const type = existingNode.type;
  const rank = deriveRank(parentId, type);

  if (!label || !parentId || !rank) {
    return;
  }

  if (type === "taxon" && (parentId === nodeId || isDescendant(nodeId, parentId))) {
    alert("A branch cannot be moved inside itself or one of its descendants.");
    return;
  }

  const previousTaxonomy = structuredClone(taxonomy);
  const oldParentId = taxonomy.parents[nodeId];
  let targetParentId = parentId;
  const updatedNode = {
    ...existingNode,
    label,
    rank,
    summary: formData.get("summary").trim()
  };

  if (type === "species") {
    updatedNode.profile = Object.fromEntries(
      taxonomy.meta.leafTemplate.map((field) => [
        field.key,
        formData.get(field.key)?.trim() || ""
      ])
    );
    updatedNode.notes = formData.get("notes")?.trim() || "";
    targetParentId = resolveSpeciesParentId(
      taxonomy,
      parentId,
      updatedNode.profile.scientificName
    );
  }

  taxonomy.nodes[nodeId] = updatedNode;

  if (oldParentId && oldParentId !== targetParentId && taxonomy.children[oldParentId]) {
    taxonomy.children[oldParentId] = taxonomy.children[oldParentId].filter(
      (childId) => childId !== nodeId
    );
  }

  taxonomy.children[targetParentId] ||= [];
  if (!taxonomy.children[targetParentId].includes(nodeId)) {
    taxonomy.children[targetParentId].push(nodeId);
  }
  taxonomy.children[targetParentId].sort((leftId, rightId) =>
    taxonomy.nodes[leftId].label.localeCompare(taxonomy.nodes[rightId].label)
  );
  taxonomy.parents[nodeId] = targetParentId;

  if (!(await persistTaxonomy())) {
    taxonomy = previousTaxonomy;
    hydrateEditor();
    syncCrossLinks();
    syncRoute();
    return;
  }
  populateParentOptions();
  populateEditOptions();
  populateDeleteOptions();
  loadNodeIntoEditor(nodeId);
  syncCrossLinks();
  location.hash = `#/node/${nodeId}`;
}

function deriveRank(parentId, nodeType) {
  if (nodeType === "species") {
    return "species";
  }

  const parent = taxonomy.nodes[parentId];

  if (!parent || parent.type !== "taxon") {
    return "";
  }

  return NEXT_TAXON_RANK[parent.rank] || "";
}

function loadNodeIntoEditor(nodeId) {
  const node = taxonomy.nodes[nodeId];

  if (!node || !editorForm || !parentSelect || !nodeTypeSelect) {
    return;
  }

  editorState.editingNodeId = nodeId;
  const parentId = taxonomy.parents[nodeId] || taxonomy.meta.rootId;

  if (editNodeSelect && hasSelectOption(editNodeSelect, nodeId)) {
    editNodeSelect.value = nodeId;
  }

  parentSelect.value = parentId;
  nodeTypeSelect.value = node.type;
  renderEditorFields();

  editorForm.elements.label.value = node.label || "";
  editorForm.elements.summary.value = node.summary || "";
  if (editorForm.elements.notes) {
    editorForm.elements.notes.value = node.notes || "";
  }

  if (node.type === "species") {
    taxonomy.meta.leafTemplate.forEach((field) => {
      const input = editorForm.elements[field.key];

      if (input) {
        input.value = node.profile?.[field.key] || "";
      }
    });
  }
}

function resetEditorForm(syncSelections = true) {
  if (!editorForm || !nodeTypeSelect) {
    return;
  }

  editorState.editingNodeId = null;
  editorForm.reset();
  nodeTypeSelect.disabled = false;
  nodeTypeSelect.value = "taxon";
  if (editNodeSelect) {
    editNodeSelect.value = "";
  }

  if (syncSelections) {
    syncEditorSelections(getRouteNodeId());
    return;
  }

  renderEditorFields();
}

async function deleteNodeFromForm() {
  if (!deleteNodeSelect) {
    return;
  }

  const nodeId = deleteNodeSelect.value;

  if (!nodeId || !taxonomy.nodes[nodeId] || nodeId === taxonomy.meta.rootId) {
    return;
  }

  const node = taxonomy.nodes[nodeId];
  const descendants = collectDescendants(nodeId);
  const totalRemoved = descendants.length + 1;
  const label =
    totalRemoved === 1
      ? `${node.label}`
      : `${node.label} and ${descendants.length} descendant${descendants.length === 1 ? "" : "s"}`;

  if (!confirm(`Delete ${label}? This cannot be undone.`)) {
    return;
  }

  const previousTaxonomy = structuredClone(taxonomy);
  const parentId = taxonomy.parents[nodeId];

  if (parentId && taxonomy.children[parentId]) {
    taxonomy.children[parentId] = taxonomy.children[parentId].filter(
      (childId) => childId !== nodeId
    );
  }

  [nodeId, ...descendants].forEach((id) => {
    delete taxonomy.nodes[id];
    delete taxonomy.parents[id];
    delete taxonomy.children[id];
  });

  if (!(await persistTaxonomy())) {
    taxonomy = previousTaxonomy;
    hydrateEditor();
    syncCrossLinks();
    syncRoute();
    return;
  }
  populateParentOptions();
  populateEditOptions();
  populateDeleteOptions();
  syncCrossLinks();

  if (editorState.editingNodeId === nodeId || descendants.includes(editorState.editingNodeId)) {
    resetEditorForm(false);
  }

  const currentId = location.hash.split("/")[2];
  const nextId =
    currentId && !taxonomy.nodes[currentId]
      ? parentId || taxonomy.meta.rootId
      : currentId || parentId || taxonomy.meta.rootId;

  const nextHash =
    nextId === taxonomy.meta.rootId ? "#/browse" : `#/node/${nextId}`;

  if (location.hash === nextHash) {
    syncRoute();
    return;
  }

  location.hash = nextHash;
}

function isDescendant(ancestorId, candidateId) {
  if (!ancestorId || !candidateId) {
    return false;
  }

  const queue = [...(taxonomy.children[ancestorId] || [])];

  while (queue.length) {
    const currentId = queue.shift();

    if (currentId === candidateId) {
      return true;
    }

    queue.push(...(taxonomy.children[currentId] || []));
  }

  return false;
}

function exportTaxonomy() {
  clearStoredNodeImages(taxonomy);
  downloadTaxonomyFile();
}

function setBrowseSearchScope(scopeId) {
  if (browseSearchState.scopeId === scopeId) {
    return;
  }

  browseSearchState.scopeId = scopeId;
  browseSearchState.query = "";
}

function renderBranchCardResults(scopeId, children) {
  const cardGrid = view.querySelector("[data-card-grid]");
  const emptyState = view.querySelector("[data-branch-empty-state]");
  const status = view.querySelector("[data-branch-search-status]");

  if (!cardGrid || !emptyState) {
    return;
  }

  const query = browseSearchState.scopeId === scopeId ? browseSearchState.query : "";
  const filteredChildren = filterBranchChildren(children, query);
  const scopeLabel = taxonomy.nodes[scopeId]?.label || "this branch";

  if (filteredChildren.length) {
    cardGrid.innerHTML = filteredChildren
      .map(
        (child) => `
          <button class="card" type="button" data-node-id="${child.id}">
            <div class="card__media" style="${buildCardBackground(child)}"></div>
            <span class="card__rank">${escapeHtml(child.rank)}</span>
            <h3>${escapeHtml(child.label)}</h3>
            <p>${escapeHtml(child.summary || "No summary yet.")}</p>
          </button>
        `
      )
      .join("");
    emptyState.classList.add("hidden");
  } else {
    cardGrid.innerHTML = "";
    emptyState.textContent = query
      ? `No direct children of ${scopeLabel} match "${query.trim()}".`
      : "This branch has no children yet. Add one from the editor to keep growing the taxonomy.";
    emptyState.classList.remove("hidden");
  }

  if (status) {
    status.textContent = query.trim()
      ? `Showing ${filteredChildren.length} of ${children.length} direct children in ${scopeLabel}.`
      : `Showing all ${children.length} direct children of ${scopeLabel}.`;
  }

  cardGrid.querySelectorAll("[data-node-id]").forEach((card) => {
    card.addEventListener("click", () => {
      location.hash = `#/node/${card.dataset.nodeId}`;
    });
  });
}

function filterBranchChildren(children, query) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return children;
  }

  return children.filter((child) =>
    normalizeSearchValue(child.label).includes(normalizedQuery)
  );
}

function normalizeSearchValue(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function slugify(value) {
  const slug = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return slug || `node-${crypto.randomUUID().slice(0, 8)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function ensureTopology(data) {
  normalizeRootNode(data);
  data.children ||= {};
  rebuildParents(data);
  normalizeSpeciesBranches(data);
  rebuildParents(data);

  Object.entries(data.children).forEach(([parentId, childIds]) => {
    if (!data.nodes[parentId]) {
      delete data.children[parentId];
      return;
    }

    data.children[parentId] = [...new Set(childIds)]
      .filter((childId) => data.nodes[childId])
      .sort((leftId, rightId) =>
        data.nodes[leftId].label.localeCompare(data.nodes[rightId].label)
      );
  });

  rebuildParents(data);
  clearStoredNodeImages(data);

  return data;
}

async function loadBundledTaxonomy() {
  try {
    const response = await fetch(TAXONOMY_JSON_URL, { cache: "no-store" });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

async function loadTaxonomyFromApi() {
  try {
    const response = await fetch(TAXONOMY_API_URL, { cache: "no-store" });

    if (!response.ok) {
      return null;
    }

    updateFileStatus("Connected to PHP storage. Edits save to data/taxonomy.json.");
    return await response.json();
  } catch {
    return null;
  }
}

async function saveTaxonomyToApi() {
  try {
    const response = await fetch(TAXONOMY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taxonomy)
    });

    if (!response.ok) {
      return false;
    }

    updateFileStatus("Saved to data/taxonomy.json.");
    return true;
  } catch {
    return false;
  }
}

function updateFileStatus(message = "") {
  if (!fileStatus) {
    return;
  }

  if (message) {
    fileStatus.textContent = message;
    return;
  }

  fileStatus.textContent =
    "If the app is served through PHP, edits save directly to data/taxonomy.json.";
}

function downloadTaxonomyFile(filename = "taxonomy-export.json") {
  clearStoredNodeImages(taxonomy);
  const blob = new Blob([JSON.stringify(taxonomy, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function normalizeRootNode(data) {
  data.meta ||= {};
  data.nodes ||= {};
  data.meta.rootId ||= "all-birds";

  const rootNode = data.nodes[data.meta.rootId];

  if (!rootNode) {
    return;
  }

  rootNode.label = "Aves";
  rootNode.rank = "class";
  rootNode.summary = "Start at Aves and drill down through orders, families, genera, and species.";
}

function rebuildParents(data) {
  data.children ||= {};
  data.parents = {};

  Object.entries(data.children).forEach(([parentId, childIds]) => {
    childIds.forEach((childId) => {
      if (data.nodes[parentId] && data.nodes[childId]) {
        data.parents[childId] = parentId;
      }
    });
  });
}

function normalizeSpeciesBranches(data) {
  const speciesIds = Object.values(data.nodes)
    .filter((node) => node.type === "species")
    .map((node) => node.id);

  speciesIds.forEach((speciesId) => {
    const parentId = data.parents[speciesId];
    const parent = data.nodes[parentId];

    if (!parent || parent.type !== "taxon" || parent.rank === "genus") {
      return;
    }

    const genusId = resolveSpeciesParentId(
      data,
      parentId,
      data.nodes[speciesId].profile?.scientificName
    );

    if (!genusId || genusId === parentId) {
      return;
    }

    data.children[parentId] = (data.children[parentId] || []).filter(
      (childId) => childId !== speciesId
    );
    data.children[genusId] ||= [];

    if (!data.children[genusId].includes(speciesId)) {
      data.children[genusId].push(speciesId);
    }

    data.parents[speciesId] = genusId;
  });
}

function clearStoredNodeImages(tree) {
  Object.values(tree.nodes || {}).forEach((node) => {
    delete node.image;
  });
}

async function refreshImageCatalog() {
  speciesImageCache.clear();
  speciesPrimaryImageCache.clear();
  nodeRepresentativeImageCache.clear();

  const speciesNodes = Object.values(taxonomy.nodes).filter((node) => node.type === "species");

  await Promise.all(
    speciesNodes.map(async (node) => {
      const primaryImage = buildSpeciesImagePath(node, 0);

      if (primaryImage && (await canLoadImage(primaryImage))) {
        speciesPrimaryImageCache.set(node.id, primaryImage);
      }
    })
  );
}

function resolveRepresentativeImage(nodeId) {
  if (!nodeId) {
    return "";
  }

  if (nodeRepresentativeImageCache.has(nodeId)) {
    return nodeRepresentativeImageCache.get(nodeId);
  }

  const node = taxonomy.nodes[nodeId];

  if (!node) {
    nodeRepresentativeImageCache.set(nodeId, "");
    return "";
  }

  if (node.type === "species") {
    const image = speciesPrimaryImageCache.get(nodeId) || "";
    nodeRepresentativeImageCache.set(nodeId, image);
    return image;
  }

  let image = "";

  for (const childId of taxonomy.children[nodeId] || []) {
    image = resolveRepresentativeImage(childId);

    if (image) {
      break;
    }
  }

  nodeRepresentativeImageCache.set(nodeId, image);
  return image;
}

function getSpeciesImageFolder(node) {
  if (!node || node.type !== "species") {
    return "";
  }

  const speciesSegment = formatSpeciesImageSegment(node.profile?.scientificName);

  if (!speciesSegment) {
    return "";
  }

  const lineageSegments = buildLineage(node.id)
    .slice(0, -1)
    .map((entry) => formatImagePathSegment(entry.label))
    .filter(Boolean);

  return `./img/${[...lineageSegments, speciesSegment].join("/")}`;
}

function buildSpeciesImagePath(node, index) {
  const speciesFolder = getSpeciesImageFolder(node);

  if (!speciesFolder) {
    return "";
  }

  return `${speciesFolder}/${index}.png`;
}

function formatImagePathSegment(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function formatSpeciesImageSegment(scientificName) {
  return String(scientificName || "")
    .trim()
    .split(/\s+/)
    .slice(1)
    .filter(Boolean)
    .map((token) => {
      const cleanedToken = formatImagePathSegment(token).toLowerCase();

      if (!cleanedToken) {
        return "";
      }

      return cleanedToken.charAt(0).toUpperCase() + cleanedToken.slice(1);
    })
    .filter(Boolean)
    .join("_");
}

function resolveSpeciesParentId(tree, parentId, scientificName) {
  const parent = tree.nodes[parentId];

  if (!parent || parent.type !== "taxon" || parent.rank === "genus") {
    return parentId;
  }

  return ensureGenusNode(tree, parentId, scientificName) || parentId;
}

function ensureGenusNode(tree, parentId, scientificName) {
  const genusName = getGenusName(scientificName);

  if (!genusName) {
    return "";
  }

  const genusId = slugify(genusName);
  const existingNode = tree.nodes[genusId];

  if (existingNode && (existingNode.type !== "taxon" || existingNode.rank !== "genus")) {
    return "";
  }

  if (!existingNode) {
    tree.nodes[genusId] = {
      id: genusId,
      type: "taxon",
      label: genusName,
      rank: "genus",
      summary: buildGenusSummary(genusName, tree.nodes[parentId])
    };
  }

  tree.children[parentId] ||= [];
  if (!tree.children[parentId].includes(genusId)) {
    tree.children[parentId].push(genusId);
    tree.children[parentId].sort((leftId, rightId) =>
      tree.nodes[leftId].label.localeCompare(tree.nodes[rightId].label)
    );
  }

  tree.children[genusId] ||= [];
  tree.parents[genusId] = parentId;

  return genusId;
}

function getGenusName(scientificName) {
  return scientificName?.trim().split(/\s+/)[0] || "";
}

function buildGenusSummary(genusName, parentNode) {
  if (parentNode?.label) {
    return `${genusName} as a genus branch within ${parentNode.label}.`;
  }

  return `${genusName} as a genus branch.`;
}

function collectDescendants(nodeId) {
  const descendants = [];
  const queue = [...(taxonomy.children[nodeId] || [])];

  while (queue.length) {
    const currentId = queue.shift();
    descendants.push(currentId);
    queue.push(...(taxonomy.children[currentId] || []));
  }

  return descendants;
}

function buildCardBackground(node) {
  return `--card-image: ${buildBackgroundImageValue(getNodeImage(node))}`;
}

function buildPanelBackground(node) {
  return `--panel-image: ${buildBackgroundImageValue(getNodeImage(node))}`;
}

function buildBackgroundImageValue(imageUrl) {
  return `url('${imageUrl || DEFAULT_IMAGE}')`;
}

function getNodeImage(node) {
  return resolveRepresentativeImage(node?.id);
}

function getSpeciesInitialImage(node) {
  const image = speciesPrimaryImageCache.get(node.id);

  if (!image) {
    return DEFAULT_IMAGE;
  }

  return image;
}

async function initializeSpeciesGallery(node) {
  const gallery = view.querySelector(`[data-species-gallery="${node.id}"]`);

  if (!gallery) {
    return;
  }

  const imageElement = gallery.querySelector(".species-gallery__image");
  const statusElement = gallery.querySelector(".species-gallery__status");
  const prevButton = gallery.querySelector('[data-gallery-action="prev"]');
  const nextButton = gallery.querySelector('[data-gallery-action="next"]');

  if (!imageElement || !statusElement || !prevButton || !nextButton) {
    return;
  }

  const images = await collectSpeciesImages(node);
  let currentIndex = 0;

  const updateGallery = () => {
    imageElement.src = images[currentIndex];
    statusElement.textContent = `${currentIndex + 1} / ${images.length}`;
    prevButton.disabled = images.length <= 1;
    nextButton.disabled = images.length <= 1;
  };

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  });

  updateGallery();
}

async function collectSpeciesImages(node) {
  if (speciesImageCache.has(node.id)) {
    return speciesImageCache.get(node.id);
  }

  const images = [];
  const imageKeys = new Set();

  const speciesFolder = getSpeciesImageFolder(node);

  if (speciesFolder) {
    const seriesImages = await collectImageSeries(speciesFolder);

    seriesImages.forEach((imagePath) => {
      pushUniqueImage(images, imageKeys, imagePath);
    });
  }

  if (!images.length) {
    images.push(DEFAULT_IMAGE);
  }

  speciesImageCache.set(node.id, images);
  return images;
}

async function collectImageSeries(folderPath) {
  const images = [];
  let foundInSeries = false;

  for (let index = 0; index < 50; index += 1) {
    const imagePath = `${folderPath}/${index}.png`;

    if (await canLoadImage(imagePath)) {
      images.push(imagePath);
      foundInSeries = true;
    } else if (foundInSeries) {
      break;
    }
  }

  return images;
}

function pushUniqueImage(images, imageKeys, imagePath) {
  const imageKey = normalizeImageKey(imagePath);

  if (!imageKey || imageKeys.has(imageKey)) {
    return false;
  }

  imageKeys.add(imageKey);
  images.push(imagePath);
  return true;
}

function normalizeImageKey(imagePath) {
  if (!imagePath) {
    return "";
  }

  return imagePath
    .trim()
    .replace(/^\.?\//, "")
    .replace(/\\/g, "/")
    .toLowerCase();
}

function canLoadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

function syncCrossLinks() {
  const routeHash = location.hash || "#/browse";

  if (openEditorLink) {
    openEditorLink.href = `./edit.html${routeHash}`;
  }

  if (openBrowseLink) {
    openBrowseLink.href = `./browse.html${routeHash}`;
  }
}

function getRouteNodeId() {
  const route = location.hash.slice(1) || "/browse";
  const [, section, nodeId] = route.split("/");

  if (section === "node" && nodeId && taxonomy.nodes[nodeId]) {
    return nodeId;
  }

  return null;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });
}

bootstrap();
