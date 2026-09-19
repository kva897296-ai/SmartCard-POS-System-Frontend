# Smart Card POS System - Frontend

A modern, touch-friendly React/TypeScript frontend for a Smart Card Point of Sale (POS) System with comprehensive features including product catalog, shopping cart, multiple payment methods, and multi-language support.

## Features

### 🎯 Core Functionality
- **Product Catalog**: Browse and search products with category filtering
- **Shopping Cart**: Real-time cart management with quantity controls
- **Multiple Payment Methods**: 
  - EMV Chip Card
  - NFC/Contactless
  - Magnetic Stripe
  - Cash
  - QR Code
- **Digital Receipts**: Professional receipt generation and display
- **Transaction History**: View and manage past transactions

### 🌍 Internationalization (i18n)
- **5 Languages**: English, Spanish, French, German, Chinese
- **RTL Support**: Right-to-left language support
- **Currency Localization**: Automatic currency formatting based on locale
- **Date/Time Formatting**: Locale-aware date and time display

### 📱 Responsive Design
- Desktop optimized (1920x1080+)
- Tablet friendly (768px - 1024px)
- Mobile responsive (320px+)
- Touch-optimized controls

### 🎨 Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Intuitive navigation
- Real-time status updates
- Loading states and error handling

## Tech Stack

- **React 18.2**: UI framework with hooks
- **TypeScript 5.3**: Type-safe development
- **React Router 6**: Client-side routing
- **Axios**: HTTP client
- **i18next**: Internationalization
- **CSS Modules**: Scoped styling
- **React Icons**: Icon library

## Directory Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── CartItem.tsx
│   │   │   └── ShoppingCart.tsx
│   │   ├── Common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── Modal.tsx
│   │   ├── Payment/
│   │   │   ├── PaymentProcessor.tsx
│   │   │   └── PaymentSelector.tsx
│   │   ├── POS/
│   │   │   ├── POSTerminal.tsx
│   │   │   └── TransactionHistory.tsx
│   │   ├── Products/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductCatalog.tsx
│   │   └── Receipt/
│   │       └── Receipt.tsx
│   ├── context/
│   │   ├── AppContext.tsx
│   │   └── CartContext.tsx
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── usePayment.ts
│   │   ├── useProducts.ts
│   │   └── useTransactions.ts
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   ├── es.json
│   │   │   ├── fr.json
│   │   │   ├── de.json
│   │   │   └── zh.json
│   │   └── index.ts
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── paymentService.ts
│   │   ├── productService.ts
│   │   └── transactionService.ts
│   ├── styles/
│   │   ├── App.css
│   │   ├── Button.module.css
│   │   ├── Card.module.css
│   │   ├── Cart.module.css
│   │   ├── CartItem.module.css
│   │   ├── Input.module.css
│   │   ├── Loading.module.css
│   │   ├── Modal.module.css
│   │   ├── Payment.module.css
│   │   ├── PaymentProcessor.module.css
│   │   ├── POSTerminal.module.css
│   │   ├── ProductCard.module.css
│   │   ├── ProductCatalog.module.css
│   │   ├── Receipt.module.css
│   │   └── TransactionHistory.module.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── helpers.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running (default: http://localhost:8080/api)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. Configure API endpoint in `.env`:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

### Development

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Build

Create production build:
```bash
npm run build
```

The optimized production build will be in the `build/` directory.

### Testing

Run tests:
```bash
npm test
```

### Linting

Check code style:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

## Configuration

### Terminal Configuration

Edit terminal settings in `src/context/AppContext.tsx`:

```typescript
const defaultConfig: TerminalConfig = {
  terminalId: 'TERMINAL-001',
  merchantId: 'MERCHANT-001',
  merchantName: 'Smart Card POS',
  merchantAddress: '123 Main St, City, Country',
  currency: 'USD',
  taxRate: 0.1,
  supportedPaymentMethods: ['EMV', 'NFC', 'MAGNETIC_STRIPE', 'CASH', 'QR_CODE'],
  locale: 'en-US',
};
```

### Language Support

Add new languages by:

1. Create translation file in `src/i18n/locales/[lang].json`
2. Import and register in `src/i18n/index.ts`
3. Add language option in `src/App.tsx`

## Usage

### POS Terminal

1. **Browse Products**: View product catalog with search and filter
2. **Add to Cart**: Click "Add to Cart" on desired products
3. **Manage Cart**: Adjust quantities or remove items
4. **Checkout**: Click "Checkout" button when ready
5. **Select Payment**: Choose payment method (EMV, NFC, etc.)
6. **Process Payment**: Follow on-screen instructions
7. **View Receipt**: Receipt displays after successful payment

### Transaction History

- View all past transactions
- Filter by date, status, or payment method
- View detailed receipts for any transaction
- Print or email receipts

## API Integration

The frontend integrates with the backend API for:

- Product catalog management
- Payment processing
- Transaction history
- Card reader status

See `src/services/` for API client implementations.

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

## Performance

- Code splitting with React.lazy
- CSS modules for scoped styles
- Optimized bundle size
- Lazy loading for images
- Memoization for expensive operations

## Security

- XSS protection via React
- CSRF token support
- Secure API communication
- Input sanitization
- No sensitive data in localStorage

## Contributing

1. Follow TypeScript strict mode
2. Use functional components with hooks
3. Implement proper error handling
4. Add proper TypeScript types
5. Follow CSS module naming conventions
6. Test responsive design
7. Ensure i18n support for new features

## License

Copyright © 2024 Smart Card POS System. All rights reserved.

## Support

For issues or questions, please contact the development team.
