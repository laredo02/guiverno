// Loads blog entries listed in entries/index.json, sorts them by date
// (newest first) and injects each HTML fragment into #blog.
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('blog');
  if (!container) return;

  fetch('entries/index.json')
    .then(function (res) {
      if (!res.ok) throw new Error('No se pudo cargar entries/index.json');
      return res.json();
    })
    .then(function (entries) {
      entries.sort(function (a, b) {
        return b.date.localeCompare(a.date);
      });

      return Promise.all(entries.map(function (entry) {
        return fetch('entries/' + entry.file)
          .then(function (res) {
            if (!res.ok) throw new Error('No se pudo cargar ' + entry.file);
            return res.text();
          })
          .then(function (html) {
            const article = document.createElement('article');
            article.className = 'blog-entry';

            const title = document.createElement('h2');
            title.textContent = entry.title;

            const meta = document.createElement('p');
            meta.className = 'blog-meta';
            meta.textContent = entry.date + ' · ' + entry.author;

            const body = document.createElement('div');
            body.className = 'blog-content';
            body.innerHTML = html;

            article.appendChild(title);
            article.appendChild(meta);
            article.appendChild(body);
            return article;
          });
      }));
    })
    .then(function (articles) {
      articles.forEach(function (article) {
        container.appendChild(article);
      });
    })
    .catch(function (err) {
      console.error(err);
    });
});
