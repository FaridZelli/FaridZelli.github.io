// ----------------------------------------
// https://github.com/FaridZelli
// ----------------------------------------

const ARTICLE_FILE_NAMES = [
"article-template.html",
"https://faridzelli.com/"
];

initializeArticleIndex();

async function initializeArticleIndex() {
	const articleMetadataList = await loadAllArticleMetadata();
	const sortedArticles = sortArticlesByDateDescending(articleMetadataList);
	renderArticleList(sortedArticles);
}

// ------------------------------
// Fetch and parse metadata for all articles
// ------------------------------

async function loadAllArticleMetadata() {
	const metadataList = [];

	for (const fileName of ARTICLE_FILE_NAMES) {
		try {
			const metadata = await fetchArticleMetadata(fileName);
			metadataList.push(metadata);
		} catch (error) {
			console.error(`Failed to load article metadata: ${fileName}`, error);
		}
	}

	return metadataList;
}

// ------------------------------
// Fetch a single article and extract metadata from its HTML
// ------------------------------

async function fetchArticleMetadata(fileName) {
	const response = await fetch(fileName);
	const htmlText = await response.text();

	const documentObject = new DOMParser().parseFromString(
		htmlText,
		"text/html"
	);

	const title =
	documentObject.querySelector("title")?.textContent?.trim()
	?? fileName;

	const description =
	documentObject
	.querySelector('meta[name="description"]')
	?.getAttribute("content")
	?? "";

	const dateString =
	documentObject
	.querySelector('meta[name="date"]')
	?.getAttribute("content")
	?? null;

	const publicationDate = dateString
	? new Date(dateString)
	: new Date(0); // fallback for undated articles

	return {
		fileName,
		title,
		description,
		publicationDate
	};
}

// ------------------------------
// Sort articles by date, newest first
// ------------------------------

function sortArticlesByDateDescending(articles) {
	return articles.sort(
		(a, b) => b.publicationDate - a.publicationDate
	);
}

// ------------------------------
// Render the article list to the page
// ------------------------------

function renderArticleList(articles) {
	const listElement = document.getElementById("article-list");

	for (const article of articles) {
		const listItem = document.createElement("li");

		const linkElement = document.createElement("a");
		linkElement.href = article.fileName;
		linkElement.textContent = article.title;
		listItem.appendChild(linkElement);

		if (article.description) {
			const descriptionElement = document.createElement("p");
			descriptionElement.textContent = article.description;
			listItem.appendChild(descriptionElement);
		}

		listElement.appendChild(listItem);
	}
}
