# Frontend Structure Documentation

## 📁 Cấu trúc dự án

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── admin/
│   │   ├── user/
│   │   └── view/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
│
├── components/                   # React Components
│   ├── auth/                     # Authentication components
│   │   ├── AuthLayout.tsx        # Auth pages layout
│   │   ├── AuthCardHeader.tsx    # Auth card header
│   │   ├── AuthInput.tsx         # Auth input component
│   │   └── index.ts              # Barrel export
│   ├── common/                   # Shared common components
│   │   ├── LanguageDropdown.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── VideoContainer.tsx
│   ├── landing/                  # Landing page components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutContactSection.tsx
│   │   └── Footer.tsx
│   └── ui/                       # Base UI components
│       ├── Button.tsx            # Reusable button
│       ├── Alert.tsx             # Alert component
│       └── index.ts              # Barrel export
│
├── contexts/                     # React Contexts
│   ├── LanguageContext.tsx       # i18n context
│   └── ThemeContext.tsx          # Theme context (deprecated)
│
├── hooks/                        # Custom React Hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useTheme.ts               # Theme management hook
│   └── index.ts                  # Barrel export
│
├── services/                     # API Services
│   └── api.ts                    # API client & auth methods
│
├── constants/                    # Constants & Configuration
│   ├── api.ts                    # API endpoints
│   ├── routes.ts                 # Route paths
│   ├── storage.ts                # Storage keys
│   └── index.ts                  # Barrel export
│
├── locales/                      # i18n Translation files
│   ├── vi.json                   # Vietnamese
│   └── en.json                   # English
│
├── types/                        # TypeScript Types
│   └── i18n.ts                   # i18n types
│
└── lib/                          # Utility functions
    └── utils.ts                  # Helper functions
```

## 🎯 Nguyên tắc cấu trúc

### 1. **Separation of Concerns**
- **Components**: Chỉ chứa UI logic
- **Hooks**: Business logic và state management
- **Services**: API calls và data fetching
- **Constants**: Configuration và static values

### 2. **Reusability**
- Tạo components nhỏ, tái sử dụng được
- Use barrel exports (`index.ts`) cho imports sạch
- Share common logic qua custom hooks

### 3. **Type Safety**
- TypeScript strict mode
- Define types cho tất cả props
- Type API responses

### 4. **Code Organization**

#### **Components Guidelines**
```typescript
// ✅ Good: Single responsibility
export default function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

// ❌ Bad: Multiple responsibilities
export default function ButtonWithApi({ id }) {
  const [data, setData] = useState();
  useEffect(() => fetch(`/api/${id}`)...);
  return <button>{data}</button>
}
```

#### **Hooks Guidelines**
```typescript
// ✅ Good: Encapsulate logic
export function useAuth() {
  const [user, setUser] = useState(null);
  const login = async (email, password) => {...}
  return { user, login };
}

// Usage
const { user, login } = useAuth();
```

#### **Services Guidelines**
```typescript
// ✅ Good: Centralized API calls
export const authApi = {
  login: (email, password) => apiService.post('/auth/login', { email, password }),
  register: (data) => apiService.post('/auth/register', data),
}

// ❌ Bad: Scattered fetch calls in components
```

## 🔄 Data Flow

```
User Action
    ↓
Component (UI)
    ↓
Custom Hook (Logic)
    ↓
Service (API)
    ↓
Backend
    ↓
Response
    ↓
Hook updates state
    ↓
Component re-renders
```

## 📝 Naming Conventions

### Files
- **Components**: `PascalCase.tsx` (e.g., `AuthLayout.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useAuth.ts`)
- **Services**: `camelCase.ts` (e.g., `api.ts`)
- **Constants**: `camelCase.ts` (e.g., `routes.ts`)
- **Types**: `camelCase.ts` (e.g., `i18n.ts`)

### Variables & Functions
- **Components**: `PascalCase` (e.g., `AuthLayout`)
- **Functions**: `camelCase` (e.g., `handleSubmit`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)
- **Interfaces**: `PascalCase` with `Props`/`Type` suffix (e.g., `ButtonProps`)

## 🎨 Import Organization

```typescript
// 1. External libraries
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// 2. Internal absolute imports (using @/ alias)
import { useAuth } from '@/hooks';
import { authApi } from '@/services/api';
import { ROUTES } from '@/constants';

// 3. Components
import { Button, Alert } from '@/components/ui';
import AuthLayout from '@/components/auth/AuthLayout';

// 4. Types
import type { User } from '@/types';

// 5. Styles (if any)
import styles from './Component.module.css';
```

## 🚀 Best Practices

### Component Structure
```typescript
'use client'; // If using client features

// 1. Imports
import { useState } from 'react';
import { useAuth } from '@/hooks';

// 2. Types
interface ComponentProps {
  title: string;
}

// 3. Component
export default function Component({ title }: ComponentProps) {
  // 3.1. Hooks
  const { user } = useAuth();
  const [state, setState] = useState();
  
  // 3.2. Handlers
  const handleClick = () => {...}
  
  // 3.3. Effects
  useEffect(() => {...}, []);
  
  // 3.4. Render
  return <div>{title}</div>
}
```

### Custom Hook Structure
```typescript
'use client';

import { useState, useEffect } from 'react';

export function useCustomHook() {
  // 1. State
  const [state, setState] = useState();
  
  // 2. Effects
  useEffect(() => {...}, []);
  
  // 3. Methods
  const method = () => {...}
  
  // 4. Return
  return { state, method };
}
```

## 🔒 Security Practices

1. **Never expose sensitive data**
   - Use environment variables for API URLs
   - Store tokens in httpOnly cookies (production)
   
2. **Validate user input**
   - Client-side validation
   - Server-side validation

3. **Protected routes**
   - Check authentication before rendering
   - Redirect unauthenticated users

## 🌐 Internationalization (i18n)

### Adding translations
```json
// locales/vi.json
{
  "login": {
    "title": "Đăng nhập",
    "button": "Đăng nhập"
  }
}

// locales/en.json
{
  "login": {
    "title": "Sign In",
    "button": "Sign In"
  }
}
```

### Usage
```typescript
import { useLanguage } from '@/contexts/LanguageContext';

const { t } = useLanguage();
return <h1>{t('login.title')}</h1>
```

## 🎨 Theming

### Using theme hook
```typescript
import { useTheme } from '@/hooks/useTheme';

const { theme, setTheme } = useTheme();

// Switch themes
<button onClick={() => setTheme('dark')}>Dark Mode</button>
```

## 📦 Adding New Features

### 1. Add new page
```bash
src/app/new-page/page.tsx
```

### 2. Add new component
```bash
src/components/feature/NewComponent.tsx
src/components/feature/index.ts  # Barrel export
```

### 3. Add new hook
```bash
src/hooks/useNewFeature.ts
src/hooks/index.ts  # Update barrel export
```

### 4. Add API endpoint
```typescript
// constants/api.ts
export const API_ENDPOINTS = {
  NEW_FEATURE: '/api/new-feature',
}

// services/api.ts
export const newFeatureApi = {
  get: () => apiService.get(API_ENDPOINTS.NEW_FEATURE),
}
```

## ✅ Quality Checklist

Before committing code:
- [ ] Components are properly typed
- [ ] No console.errors in production
- [ ] Mobile responsive
- [ ] Theme support (light/dark/blue)
- [ ] i18n support (vi/en)
- [ ] Loading states implemented
- [ ] Error handling implemented
- [ ] Accessibility (a11y) considered

## 🔧 Maintenance

### Regular tasks
- Update dependencies monthly
- Remove unused imports
- Refactor duplicate code
- Add tests for critical paths
- Update documentation

---

**Last updated**: November 11, 2025
**Maintained by**: ICS Dashboard Team
