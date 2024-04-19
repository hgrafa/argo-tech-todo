# Argo Tech TODO app

## backend

```bash
docker compose build
docker compose up
```

## test users

Caso queira testar com tarefas geradas automaticamente:

```bash
# reseta a base de dados
docker exec php artisan migrate:reset

# roda as migrations e as seeders para popular as tabelas
docker exec php artisan migrate:fresh --seed
```

Todos os usuarios criado pela seed possuem senha `12345678`.

## frontend

```bash
npm install
npm run start
```

## screenshots

### Sign In

![sign in](./screenshots/sign-in.png)

### Sign In Loading

![loading sign in](./screenshots/loading-sign-in.png)

### Sign Up

![sign up](./screenshots/sign-up.png)

### Profile tab

![profile tab](./screenshots/profile-tab.png)

### Inbox Tab

![inbox tab](./screenshots/inbox-tab.png)
