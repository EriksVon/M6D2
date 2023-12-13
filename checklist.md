[ - ] GET /authors/:id/blogPosts/ ricevi tutti i blog post di uno specifico autore dal corrispondente ID

    aggiungo possibilità di inerire commenti agli articoli con l'embedding

[ x ] POST /blogPosts/:id = aggiungi un nuovo commento ad un post specifico
[ x ] GET /blogPosts/:id/comments = ritorna tutti i commenti di uno specifico post
[ x ] GET /blogPosts/:id/comments/:commentld= ritorna un commento specifico di un post specifico
[ x ] PUT /blogPosts/:id/comment/:commentld cambia un commento di un post specifico
[ x ] DELETE /blogPosts/:id/comment/:commentld=elimina un commento specifico da un post specifico

- PATCH /authors/:authorld/avatar, carica un'immagine per l'autore specificato e salva l'URL
  creata da cloudinary nel database.

- PATCH /blogPosts/:blogPostld/cover, carica un'immagine per il post specificato dall'id. Salva
  l'URL creato da Cloudinary nel post corrispondente.

EXTRA (facoltativo!): Invia un email all'autore quando pubblica un nuovo blog post e quando
un nuovo autore si registra sulla piattaforma

[ - ] aggiungo campi al form
[ - ] sistemata generale
[ - ] implemento errori (checkAuth)
[ - ] se la ricerca non produce risultati mostrare: no result found
