# Cấu trúc Frontend Dashboard ICS - Chuẩn Chỉnh

## 📁 Cấu trúc thư mục tối ưu

```
frontend-dashboard-ics/
├── public/                                    # Static assets
│   └── logoics.png
│
├── src/
│   ├── app/                                   # Next.js App Router
│   │   ├── (auth)/                            # 🔐 Auth Route Group
│   │   │   ├── login/                         # Trang đăng nhập
│   │   │   │   └── page.tsx
│   │   │   ├── register/                      # Trang đăng ký
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/               # Quên mật khẩu
│   │   │   │   └── page.tsx
│   │   │   └── reset-password/                # Đặt lại mật khẩu
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/                       # 📊 Dashboard Route Group
│   │   │   ├── admin/                         # Admin Panel
│   │   │   │   └── page.tsx
│   │   │   ├── user/                          # User Dashboard
│   │   │   │   └── page.tsx
│   │   │   └── view/                          # Public View
│   │   │       └── page.tsx
│   │   │
│   │   ├── layout.tsx                         # Root layout
│   │   ├── page.tsx                           # Landing page
│   │   ├── globals.css                        # Global styles
│   │   └── favicon.ico
│   │
│   ├── components/                            # React Components
│   │   ├── auth/                              # 🔐 Auth Components
│   │   │   ├── AuthLayout.tsx                 # Layout wrapper (theme + i18n controls)
│   │   │   ├── AuthCardHeader.tsx             # Card header (logo + title)
│   │   │   ├── AuthInput.tsx                  # Input với validation
│   │   │   └── index.ts                       # Barrel export
│   │   │
│   │   ├── ui/                                # 🎨 Base UI Components
│   │   │   ├── Button.tsx                     # Reusable button
│   │   │   ├── Alert.tsx                      # Alert messages
│   │   │   └── index.ts                       # Barrel export
│   │   │
│   │   ├── common/                            # 🔧 Common Components
│   │   │   ├── LanguageDropdown.tsx           # Language switcher
│   │   │   ├── ScrollToTop.tsx                # Scroll to top button
│   │   │   └── VideoContainer.tsx             # Video wrapper
│   │   │
│   │   └── landing/                           # 🏠 Landing Components
│   │       ├── Navigation.tsx                 # Main navigation
│   │       ├── HeroSection.tsx                # Hero section
│   │       ├── ServicesSection.tsx            # Services grid
│   │       ├── AboutContactSection.tsx        # About + Contact
│   │       └── Footer.tsx                     # Footer
│   │
│   ├── hooks/                                 # 🎣 Custom Hooks
│   │   ├── useAuth.ts                         # Authentication logic
│   │   ├── useTheme.ts                        # Theme management
│   │   └── index.ts                           # Barrel export
│   │
│   ├── services/                              # 🌐 API Services
│   │   └── api.ts                             # API client + methods
│   │
│   ├── constants/                             # 📋 Constants
│   │   ├── api.ts                             # API endpoints
│   │   ├── routes.ts                          # Route paths
│   │   ├── storage.ts                         # Storage keys
│   │   └── index.ts                           # Barrel export
│   │
│   ├── contexts/                              # 🔄 React Contexts
│   │   ├── LanguageContext.tsx                # i18n provider
│   │   └── ThemeContext.tsx                   # Theme provider (legacy)
│   │
│   ├── locales/                               # 🌍 i18n Translations
│   │   ├── vi.json                            # Tiếng Việt
│   │   └── en.json                            # English
│   │
│   ├── types/                                 # 📝 TypeScript Types
│   │   └── i18n.ts                            # i18n types
│   │
│   └── lib/                                   # 🛠️ Utilities
│       └── utils.ts                           # Helper functions
│
├── STRUCTURE.md                               # Documentation chi tiết
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## ✅ Các thay đổi đã thực hiện

### 1. **Route Groups (Next.js 14+)**
```
✅ TRƯỚC:                      ✅ SAU:
/login                        /(auth)/login
/register                     /(auth)/register
/forgot-password              /(auth)/forgot-password
/reset-password               /(auth)/reset-password
/admin                        /(dashboard)/admin
/user                         /(dashboard)/user
/view                         /(dashboard)/view
```

**Lợi ích:**
- URL không thay đổi (vẫn `/login`, `/admin`, etc.)
- Dễ quản lý layouts riêng cho từng nhóm
- Tổ chức code rõ ràng hơn

### 2. **Xóa Files Rác**
- ✅ Xóa thư mục `src/app/auth/` (rỗng)
- ✅ Xóa `@theme inline` (syntax không hỗ trợ)

### 3. **Sửa TypeScript Errors**
```typescript
// ❌ TRƯỚC:
const cycleTheme = () => {
  setTheme((prev) => {  // Error: 'prev' implicitly has 'any' type
    if (prev === 'light') return 'dark';
    return 'light';
  } as any);  // Error: 'as any' không đúng syntax
};

// ✅ SAU:
const cycleTheme = () => {
  setThemeState((prev: Theme) => {  // Type-safe
    if (prev === 'light') return 'dark';
    if (prev === 'dark') return 'blue';
    return 'light';
  });
  
  // Apply the cycled theme
  const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'blue' : 'light';
  localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  applyTheme(newTheme);
};
```

### 4. **Cấu trúc Modules**

#### Components Architecture
```
components/
├── auth/          → Tái sử dụng cho tất cả auth pages
├── ui/            → Base components (Button, Alert, Input)
├── common/        → Shared components (Language, Scroll, Video)
└── landing/       → Landing page specific components
```

#### Hooks Pattern
```typescript
// hooks/useAuth.ts - Authentication logic
export function useAuth() {
  const [user, setUser] = useState(null);
  const login = async (email, password) => {...}
  return { user, login, logout, hasRole };
}

// Usage
const { user, login, logout } = useAuth();
```

#### Service Layer
```typescript
// services/api.ts - Centralized API calls
export const authApi = {
  login: (email, password) => apiService.post('/auth/login', { email, password }),
  register: (data) => apiService.post('/auth/register', data),
}

// Usage
const result = await authApi.login(email, password);
```

## 🎯 Design Principles

### 1. **Separation of Concerns**
- **Components**: Chỉ chứa UI logic
- **Hooks**: Business logic & state management
- **Services**: API calls & data fetching
- **Constants**: Configuration & static values

### 2. **DRY (Don't Repeat Yourself)**
- Tạo components tái sử dụng (AuthLayout, AuthInput, Button)
- Centralize API calls (authApi)
- Shared hooks (useAuth, useTheme)

### 3. **Type Safety**
- TypeScript strict mode
- Type all props và return values
- No `any` types

### 4. **Maintainability**
- Clear folder structure
- Barrel exports (`index.ts`)
- Consistent naming conventions

## 📊 Import Patterns

```typescript
// ✅ CHUẨN - Absolute imports với @/ alias
import { useAuth } from '@/hooks';
import { authApi } from '@/services/api';
import { ROUTES } from '@/constants';
import { Button, Alert } from '@/components/ui';

// ❌ TỐI KỊ - Relative imports nhiều cấp
import { useAuth } from '../../hooks/useAuth';
import { authApi } from '../../../services/api';
```

## 🔄 Data Flow

```
User Action
    ↓
Component (UI)
    ↓
Hook (Logic)
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

## 🚀 Next Steps

### Phase 1: Refactor Auth Pages ✅
- [ ] Update `(auth)/login/page.tsx` với AuthLayout + useAuth
- [ ] Update `(auth)/register/page.tsx`
- [ ] Update `(auth)/forgot-password/page.tsx`
- [ ] Update `(auth)/reset-password/page.tsx`

### Phase 2: Refactor Dashboard Pages
- [ ] Update `(dashboard)/admin/page.tsx` với useAuth + useTheme
- [ ] Update `(dashboard)/user/page.tsx`
- [ ] Update `(dashboard)/view/page.tsx`

### Phase 3: Add i18n
- [ ] Thêm translations cho tất cả auth pages
- [ ] Thêm translations cho dashboard pages
- [ ] Test language switching

### Phase 4: Testing & Optimization
- [ ] Test all pages
- [ ] Mobile responsive check
- [ ] Theme switching test
- [ ] Performance optimization

## 📝 Naming Conventions

### Files
- Components: `PascalCase.tsx` (e.g., `AuthLayout.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useAuth.ts`)
- Services: `camelCase.ts` (e.g., `api.ts`)
- Constants: `camelCase.ts` (e.g., `routes.ts`)

### Code
- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Interfaces: `PascalCase` with suffix (e.g., `ButtonProps`)

## ✅ Quality Checklist

- [x] TypeScript strict mode - No errors ✅
- [x] Proper folder structure ✅
- [x] Route groups implemented ✅
- [x] Constants centralized ✅
- [x] API service layer ✅
- [x] Custom hooks created ✅
- [x] Reusable components ✅
- [x] Documentation complete ✅
- [ ] i18n implementation
- [ ] All pages refactored
- [ ] Mobile responsive
- [ ] Theme fully functional
- [ ] Tests added

---

**Cập nhật lần cuối**: 11/11/2025
**Trạng thái**: ✅ Cấu trúc chuẩn chỉnh hoàn thành
**Next**: Refactor auth pages để sử dụng components mới
