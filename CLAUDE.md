# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Artesãos Project** is a Brazilian artisan marketplace platform built with Next.js 15. The application connects artisans with consumers, featuring a public portal, artisan management dashboard, and moderator panel.

**Key Roles:**
- **Public Users**: Browse products and artisans
- **Artisans**: Manage products and profiles
- **Moderators**: Approve artisan registrations and handle reports

## Commands

### Development
```bash
npm run dev          # Start dev server with Turbopack (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding shadcn/ui Components
```bash
npx shadcn@latest add [component-name]
```

## Architecture

### Route Structure (Next.js App Router)

The application uses Next.js 15 App Router with route groups:

- `app/(site)/` - **Public routes** with Header/Footer (route group doesn't affect URL)
  - `page.tsx` - Home page
  - `artisan/[id]/` - Artisan profiles
  - `product/[id]/` - Product details
  - `category/[id]/` - Category listings
  - `favorites/` - User favorites
  - `settings/` - User settings
  - **Artisan-only routes:**
    - `artisan/edit-profile/` - Edit artisan profile
    - `artisan/add-product/` - Create product
    - `artisan/edit-product/[id]/` - Edit product

- `app/auth/` - **Authentication routes** (no Header/Footer)
  - `login/` - Login page
  - `register/` - User/artisan registration

- `app/moderator/` - **Moderator routes** with ModerationHeader
  - `page.tsx` - Moderator dashboard
  - `artisans/` - Approve/reject artisan registrations
  - `reports/` - Manage user reports
  - `users/` - User management

### State Management

**Zustand** is used for global state management:

- **`use-store-user.ts`** - User authentication state with persistence
  - Stores: `userId`, `userName`, `userEmail`, `userPhoto`, `isAuthenticated`, `isModerator`, `isArtisan`, `artisanUserName`, `applicationId`, `expiresAt`
  - Methods: `setUser()`, `resetStore()`, `updateUser()`
  - Uses `zustand/middleware/persist` with localStorage key `'loginStore'`
  - Includes `_hasHydrated` flag to prevent hydration issues

**React Context** providers in `client-providers.tsx`:
- `FavoritesProvider` - Manages user favorites
- `FollowProvider` - Manages artisan follows
- `SearchProvider` - Search state across the app
- `QueryClientProvider` - TanStack Query configuration

### Authentication Flow

1. **Login/Registration** (`app/auth/`)
   - Forms use React Hook Form + Zod validation (`lib/schemas/`)
   - API calls via `authApi.login()` or `authApi.register()`
   - On success: `useStoreUser.setUser()` stores user data with `expiresAt` timestamp

2. **Protected Routes**
   - Use `useAuthGuard()` hook to verify authentication
   - Hook waits for Zustand hydration (`_hasHydrated`) before checking `isAuthenticated`
   - Redirects to `/auth/login` if not authenticated

3. **Session Management**
   - `client-providers.tsx` monitors session expiration via `useEffect`
   - Axios interceptor in `api-service.ts` handles 401 responses:
     - Shows toast notification
     - Calls `resetStore()`
     - Redirects to `/auth/login` after 5 seconds

### API Layer

**Base Configuration** (`services/api-service.ts`):
- Axios client with base URL from `NEXT_PUBLIC_API_BASE_URL`
- `apiRequest<T>()` generic wrapper function
- Interceptors for 401 (session expired) and 403 (forbidden) handling
- Development mode flag: `NEXT_PUBLIC_DEVELOPMENT=true` disables credentials

**API Modules** (`services/api/`):
- `authApi` - Login, register, logout
- `userApi` - User profile operations
- `artisanApi` - Artisan CRUD operations
- `productApi` - Product management
- `catalogApi` - Materials and techniques catalog
- `reportApi` - Moderation reports
- `reviewsApi` - Product reviews
- `favoritesApi` - User favorites
- `followersApi` - Artisan followers
- `uploadApi` - File uploads
- `homeApi` - Homepage data

Import APIs from `services/api/index.ts`:
```typescript
import { authApi, productApi, artisanApi } from '@/services/api';
```

### Form Handling

**Pattern**: React Hook Form + Zod + @hookform/resolvers

**Schemas** (`lib/schemas/`):
- `login-schema.ts`
- `sign-up-schema.ts`
- `artisan-profile-schema.ts`
- `andress-schema.ts`

**Example**:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/schemas/login-schema';

const form = useForm({
  resolver: zodResolver(loginSchema),
});
```

### Data Fetching

**TanStack Query** is configured in `client-providers.tsx`:
- Default retry: 1
- `refetchOnWindowFocus: false`

**Custom Hooks** for data fetching:
- `use-fetch-artisans.ts` - Fetch artisan listings
- `use-product-data.ts` - Product data management
- `use-product-review.ts` - Product reviews

### Component Organization

- `components/ui/` - **shadcn/ui components** (Button, Dialog, etc.)
- `components/features/` - **Feature-specific components**:
  - `home/` - Homepage components
  - `artisan/` - Artisan profile/dashboard components
  - `moderator/` - Moderation panel components
  - `product/` - Product display/forms
  - `register/` - Registration wizard steps
- `components/common/` - Shared components across features
- `components/header.tsx` - Main site header
- `components/footer.tsx` - Site footer

### Constants & Types

**Constants** (`constants/`):
- `materia-prima.ts` - Available materials
- `tecnicas.ts` - Artisan techniques
- `finalidades.ts` - Product purposes

**Types** (`types/`):
- `user-props.ts` - User and auth types
- `artisan.ts` - Artisan data types
- `product.ts` - Product data types
- `report.ts` - Moderation report types
- `category.ts` - Category types
- `review.ts` - Review types

### Styling

- **Tailwind CSS 4** with custom color palette
- Custom colors: Dust, Midnight, Sakura, Solar, Mint (defined in `globals.css`)
- Font: Poppins (weights: 200, 400, 600, 700, 800)
- Mobile-first responsive design

### Image Handling

Next.js Image component accepts remote patterns from:
- All HTTP/HTTPS hosts (`**`)
- GitHub avatars
- `placehold.co` placeholders
- Internal server: `http://72.60.155.229:9000`

Configure additional domains in `next.config.ts`.

## Environment Variables

Required in `.env`:
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3333"
NEXT_PUBLIC_DEVELOPMENT="true"  # Optional: disables credentials in dev
```

## Code Style

**ESLint Configuration** (`eslint.config.mts`):
- TypeScript ESLint recommended rules
- React + React Hooks rules
- JSX A11y accessibility warnings
- Prettier integration with:
  - `printWidth: 80`
  - `singleQuote: true`
  - `trailingComma: 'all'`
  - `semi: true`
- Custom rules:
  - Self-closing components enforced
  - No React import needed in JSX
  - Alt text warnings for images

## Key Patterns

### Protected Route Pattern
```typescript
'use client';
import { useAuthGuard } from '@/hooks/use-auth-guard';

export default function ProtectedPage() {
  const { hasHydrated, isAuthenticated } = useAuthGuard();

  if (!hasHydrated) return <LoadingSpinner />;
  // Component content
}
```

### API Call Pattern
```typescript
import { productApi } from '@/services/api';
import { toast } from 'sonner';

try {
  const product = await productApi.create(formData);
  toast.success('Produto criado com sucesso!');
} catch (error) {
  toast.error('Erro ao criar produto');
}
```

### Zustand Store Access
```typescript
import useStoreUser from '@/hooks/use-store-user';

// In component
const user = useStoreUser((state) => state.user);
const setUser = useStoreUser((state) => state.setUser);

// Outside component (e.g., interceptors)
const { resetStore } = useStoreUser.getState();
```

## Important Notes

- **TypeScript paths**: Use `@/*` alias for `src/*` imports
- **Route protection**: Always use `useAuthGuard()` for protected pages
- **Session handling**: Session expiration is automatic via `client-providers.tsx`
- **Form validation**: All forms must use Zod schemas
- **shadcn/ui style**: Uses "new-york" style variant
- **Toast notifications**: Use `sonner` library with `toast.success()`, `toast.error()`
- **Development server**: Uses Turbopack for faster builds
