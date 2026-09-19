# Frontend Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Component Development

### Creating a New Component

```typescript
import React from 'react';
import styles from '../../styles/MyComponent.module.css';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

export default MyComponent;
```

### Using Hooks

```typescript
import { useState, useEffect } from 'react';

const MyComponent: React.FC = () => {
  const [data, setData] = useState<string>('');
  
  useEffect(() => {
    // Fetch data
  }, []);

  return <div>{data}</div>;
};
```

### Using Context

```typescript
import { useCart } from '../../context/CartContext';

const MyComponent: React.FC = () => {
  const { cart, addToCart } = useCart();
  
  return <div>Items: {cart.itemCount}</div>;
};
```

## Styling Guidelines

### CSS Modules

```css
/* MyComponent.module.css */
.container {
  padding: 1rem;
  background: var(--light);
}

.title {
  font-size: 1.5rem;
  color: var(--primary);
}
```

```typescript
import styles from './MyComponent.module.css';

<div className={styles.container}>
  <h2 className={styles.title}>Title</h2>
</div>
```

### Using CSS Variables

Available CSS variables:
- `--primary`: #2563eb
- `--secondary`: #64748b
- `--success`: #10b981
- `--danger`: #ef4444
- `--warning`: #f59e0b
- `--light`: #f8fafc
- `--dark`: #1e293b
- `--border`: #e2e8f0
- `--radius`: 8px

## Internationalization

### Adding Translations

1. Add keys to all language files in `src/i18n/locales/`
2. Use in components:

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent: React.FC = () => {
  const { t } = useTranslation();
  
  return <h1>{t('myComponent.title')}</h1>;
};
```

### Formatting

```typescript
import { formatCurrency, formatDate } from '../../utils/formatters';

const price = formatCurrency(99.99, 'USD', 'en-US');
const date = formatDate(new Date(), 'en-US');
```

## API Integration

### Using Services

```typescript
import productService from '../../services/productService';

const fetchProducts = async () => {
  const response = await productService.getProducts();
  if (response.success && response.data) {
    setProducts(response.data);
  }
};
```

### Creating a New Service

```typescript
import apiClient from './apiClient';
import { MyType, ApiResponse } from '../types';

class MyService {
  async getData(): Promise<ApiResponse<MyType[]>> {
    return apiClient.get<MyType[]>('/my-endpoint');
  }
}

export default new MyService();
```

## State Management

### Local State

```typescript
const [value, setValue] = useState<string>('');
```

### Context State

```typescript
// Read from context
const { cart } = useCart();

// Update context
const { addToCart } = useCart();
addToCart(product, quantity);
```

## Best Practices

1. **Type Safety**: Always define TypeScript interfaces
2. **Error Handling**: Use try-catch and display user-friendly errors
3. **Loading States**: Show loading indicators during async operations
4. **Accessibility**: Use semantic HTML and ARIA labels
5. **Performance**: Use React.memo for expensive components
6. **Code Splitting**: Use React.lazy for route-based splitting
7. **Clean Code**: Keep components small and focused

## Testing

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText(/title/i)).toBeInTheDocument();
});
```

## Common Patterns

### Conditional Rendering

```typescript
{loading && <Loading />}
{error && <Error message={error} />}
{data && <DataDisplay data={data} />}
```

### Lists

```typescript
{items.map((item) => (
  <ItemComponent key={item.id} item={item} />
))}
```

### Forms

```typescript
const [formData, setFormData] = useState({ name: '', email: '' });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle submission
};
```

## Debugging

### React DevTools
- Install React Developer Tools browser extension
- Inspect component hierarchy
- Check props and state
- Profile performance

### Console Logging
```typescript
console.log('Debug:', value);
console.error('Error:', error);
```

### Network Requests
- Use browser DevTools Network tab
- Check API responses
- Verify request/response data

## Performance Optimization

### Memoization

```typescript
import { useMemo, useCallback } from 'react';

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const memoizedCallback = useCallback(() => {
  doSomething(value);
}, [value]);
```

### Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Create `.env.production`:
```
REACT_APP_API_BASE_URL=https://api.production.com
```

### Serve Locally

```bash
npm install -g serve
serve -s build
```
