// ----------------------------------------
// https://github.com/FaridZelli
// ----------------------------------------

import { ARTICLE_FILE_NAMES } from './articles-list-index.js';

initializeArticleIndex();

async function initializeArticleIndex() {
	const articleMetadataList = await loadAllArticleMetadata();
	const sortedArticles = sortArticlesByDateDescending(articleMetadataList);

	// Render full list (existing behavior preserved)
	renderArticlesToContainer(sortedArticles, 'article-list');

	// Render recent articles list (new requirement)
	renderArticlesToContainer(sortedArticles.slice(0, 5), 'article-list-recent');
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
	.querySelector('meta[property="article:published_time"]')
	?.getAttribute("content")
	?? null;

	const publicationDate = dateString
	? new Date(dateString)
	: new Date(0); // fallback for undated articles

	return {
		fileName,
		title,
		description,
		publicationDate,
		dateString
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
// Unified renderer: handles any article list container
// ------------------------------

function renderArticlesToContainer(articles, containerId) {
	const container = document.getElementById(containerId);
	if (!container) return; // Gracefully skip missing containers
	
	// Apply consistent list styling (matches original behavior)
	Object.assign(container.style, {
		listStyle: 'none',
		padding: '0',
		margin: '0'
	});
	container.innerHTML = '';

	for (const article of articles) {
		const listItem = document.createElement('li');
		listItem.style.marginBottom = '1.2rem';

		// Title link
		const titleLink = document.createElement('a');
		titleLink.href = article.fileName;
		titleLink.textContent = article.title;
		Object.assign(titleLink.style, {
			fontWeight: 'bold',
			fontSize: '1.1rem'
		});
		listItem.appendChild(titleLink);

		// Publication date
		if (article.dateString) {
			const dateLine = document.createElement('div');
			function getOrdinalDay(date) {
				const day = date.getDate();
				const suffix =
				day % 10 === 1 && day !== 11 ? 'st' :
				day % 10 === 2 && day !== 12 ? 'nd' :
				day % 10 === 3 && day !== 13 ? 'rd' : 'th';
				return `${day}${suffix}`;
			}
			const monthYear = article.publicationDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
			const [month, year] = monthYear.split(' ');
			const dayWithSuffix = getOrdinalDay(article.publicationDate);
			const formattedDate = `${month} ${dayWithSuffix}, ${year}`;
			dateLine.textContent = formattedDate;
			Object.assign(dateLine.style, {
				color: '#888',
				fontFamily: 'monospace',
				fontSize: '0.9rem',
				marginTop: '0.2rem'
			});
			listItem.appendChild(dateLine);
		}

		// Description
		if (article.description) {
			const desc = document.createElement('div');
			desc.textContent = article.description;
			desc.style.marginTop = '0.2rem';
			listItem.appendChild(desc);
		}

		container.appendChild(listItem);
	}
}
