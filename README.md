# Xevnex Technologies

A full-stack web application built with React, TypeScript, Express, and PostgreSQL.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI, Shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query (React Query)

## Prerequisites

- Node.js 20.x or higher
- PostgreSQL database
- npm or yarn

## Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/GMD369/Xevnex_Technologies.git
cd Xevnex_Technologies
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_postgresql_connection_string
```

### 4. Set up the database
```bash
npm run db:push
```

### 5. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and helpers
├── server/                # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database operations
├── shared/                # Shared code between client and server
│   └── schema.ts          # Database schema and types
└── package.json
```

## Deployment

### Deploy to Render (Recommended)

Follow the comprehensive guide in [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)

**Quick Steps:**
1. Create PostgreSQL database on Render
2. Create Web Service and connect GitHub repo
3. Set environment variables (`DATABASE_URL`, `NODE_VERSION`)
4. Deploy!

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for a quick reference.

### Other Deployment Options

- **Railway**: Similar to Render, great for Node.js apps
- **Heroku**: Traditional platform with easy deployment
- **DigitalOcean App Platform**: Scalable with managed databases
- **AWS/GCP**: For enterprise-level deployments

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 5000) | No |

## Features

- 🎨 Modern UI with Tailwind CSS and Radix UI
- 📱 Fully responsive design
- 🔒 Type-safe API with TypeScript
- 🗄️ PostgreSQL database with Drizzle ORM
- ⚡ Fast development with Vite HMR
- 📝 Form validation with Zod
- 🎯 State management with TanStack Query

## Database Schema

Database schema is defined in `shared/schema.ts` using Drizzle ORM.

To modify the schema:
1. Edit `shared/schema.ts`
2. Run `npm run db:push` to apply changes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

For deployment help, see:
- [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Quick reference checklist

For issues and questions, please open an issue on GitHub.
