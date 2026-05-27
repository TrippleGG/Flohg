# Flohg — Task Marketplace MVP

Flohg is a task marketplace platform connecting service requesters with service providers. Users can post tasks, offer services, negotiate pricing, and complete agreements with secure escrow payments.

## 📦 Project Structure

This is a monorepo containing:

- **api/** - NestJS backend API
- **mobile/** - Flutter mobile application
- **admin/** - Next.js admin dashboard
- **docs/** - Project documentation

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)
- pnpm or npm
- Flutter (for mobile development)

### API Setup

```bash
cd api
cp .env.example .env

# Start services
docker-compose up -d

# Install dependencies
pnpm install

# Run migrations
pnpm run migrate

# Seed database
pnpm run seed

# Start development server
pnpm run start:dev
```

API docs available at [http://localhost:8080/docs](http://localhost:8080/docs)

### Mobile Setup

```bash
cd mobile
cp .env.example .env

flutter pub get
flutter run -d <device>
```

### Admin Setup

```bash
cd admin
cp .env.example .env.local

pnpm install
pnpm run dev
```

## 🏗️ Architecture

### Technology Stack

**Backend:**
- NestJS with TypeORM
- PostgreSQL + PostGIS (geo-spatial queries)
- Redis (caching & queues)
- JWT authentication
- Paystack payments
- Termii SMS/OTP

**Mobile:**
- Flutter
- Dart

**Admin:**
- Next.js
- TypeScript
- React

### Key Features

- **Task Management** - Post, search, and filter tasks by location and category
- **Offers & Negotiation** - Service providers can make and counter offers
- **Escrow Payments** - Secure payment holding with multiple release triggers
- **Verifications** - KYC, driver license, degree verification
- **Admin Dashboard** - Verification queue, disputes, payment monitoring
- **Geo-spatial Search** - PostGIS for location-based task discovery

## 📋 API Endpoints

See [OpenAPI Spec](docs/openapi.yaml) for full API documentation.

### Auth
- `POST /auth/otp/start` - Request OTP
- `POST /auth/otp/verify` - Verify OTP and get tokens

### Tasks
- `GET /tasks` - Search nearby tasks
- `POST /tasks` - Create task
- `GET /tasks/{id}` - Get task details

### Offers
- `POST /tasks/{id}/offers` - Make offer
- `PATCH /offers/{id}` - Counter/withdraw/accept offer

### Agreements
- `POST /offers/{id}/accept` - Accept offer → create agreement
- `POST /agreements/{id}/escrow/hold` - Hold payment
- `POST /agreements/{id}/release` - Release payment

### Verifications
- `GET /verifications/status` - Check verification status
- `POST /verifications/driver-license` - Submit driver license
- `POST /verifications/degree` - Submit degree proof

## 🔐 Security

- All sensitive data in `.env` files (never commit)
- JWT authentication with expiration
- Escrow system prevents fraud
- KYC verification for high-value tasks
- Rate limiting on OTP endpoints
- CORS enabled for mobile/web clients

## 🧪 Testing

```bash
# Run unit tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Generate coverage report
pnpm run test:cov
```

## 📝 Development

### Code Quality

```bash
# Run linter
pnpm run lint

# Format code
pnpm run format
```

### Database Migrations

```bash
# Create new migration
cd api && pnpm run migrate:create src/database/migrations/description

# Run migrations
pnpm run migrate
```

## 🚢 Deployment

### Docker Build

```bash
cd api
docker build -t flohg-api:latest .
docker run -p 8080:8080 --env-file .env flohg-api:latest
```

## 📚 Documentation

- [Architecture](docs/architecture.md)
- [Runbook](docs/runbook.md)
- [OpenAPI Spec](docs/openapi.yaml)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'feat: description'`
3. Push: `git push origin feature/your-feature`
4. Open a pull request

## 📄 License

MIT
