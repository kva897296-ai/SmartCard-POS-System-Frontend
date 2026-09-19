#!/bin/bash

# Smart Card POS System - Frontend Validation Script
# This script validates that all required files and structure are in place

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   Smart Card POS System - Frontend Validation            ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

ERRORS=0
WARNINGS=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo "✓ $1"
    else
        echo "✗ MISSING: $1"
        ((ERRORS++))
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo "✓ $1/"
    else
        echo "✗ MISSING: $1/"
        ((ERRORS++))
    fi
}

echo "Checking Configuration Files..."
echo "─────────────────────────────────"
check_file "package.json"
check_file "tsconfig.json"
check_file ".gitignore"
check_file "README.md"
check_file "PROJECT_SUMMARY.md"
check_file "DEVELOPMENT.md"
echo ""

echo "Checking Public Assets..."
echo "─────────────────────────────────"
check_dir "public"
check_file "public/index.html"
check_file "public/manifest.json"
check_file "public/robots.txt"
echo ""

echo "Checking Source Structure..."
echo "─────────────────────────────────"
check_dir "src"
check_file "src/index.tsx"
check_file "src/App.tsx"
check_file "src/react-app-env.d.ts"
echo ""

echo "Checking Components..."
echo "─────────────────────────────────"
check_dir "src/components/Common"
check_file "src/components/Common/Button.tsx"
check_file "src/components/Common/Card.tsx"
check_file "src/components/Common/Input.tsx"
check_file "src/components/Common/Loading.tsx"
check_file "src/components/Common/Modal.tsx"

check_dir "src/components/Cart"
check_file "src/components/Cart/ShoppingCart.tsx"
check_file "src/components/Cart/CartItem.tsx"

check_dir "src/components/Products"
check_file "src/components/Products/ProductCatalog.tsx"
check_file "src/components/Products/ProductCard.tsx"

check_dir "src/components/Payment"
check_file "src/components/Payment/PaymentSelector.tsx"
check_file "src/components/Payment/PaymentProcessor.tsx"

check_dir "src/components/Receipt"
check_file "src/components/Receipt/Receipt.tsx"

check_dir "src/components/POS"
check_file "src/components/POS/POSTerminal.tsx"
check_file "src/components/POS/TransactionHistory.tsx"
echo ""

echo "Checking Context Providers..."
echo "─────────────────────────────────"
check_dir "src/context"
check_file "src/context/AppContext.tsx"
check_file "src/context/CartContext.tsx"
echo ""

echo "Checking Custom Hooks..."
echo "─────────────────────────────────"
check_dir "src/hooks"
check_file "src/hooks/useProducts.ts"
check_file "src/hooks/useTransactions.ts"
check_file "src/hooks/usePayment.ts"
check_file "src/hooks/useMediaQuery.ts"
echo ""

echo "Checking Services..."
echo "─────────────────────────────────"
check_dir "src/services"
check_file "src/services/apiClient.ts"
check_file "src/services/paymentService.ts"
check_file "src/services/productService.ts"
check_file "src/services/transactionService.ts"
echo ""

echo "Checking i18n..."
echo "─────────────────────────────────"
check_dir "src/i18n"
check_file "src/i18n/index.ts"
check_dir "src/i18n/locales"
check_file "src/i18n/locales/en.json"
check_file "src/i18n/locales/es.json"
check_file "src/i18n/locales/fr.json"
check_file "src/i18n/locales/de.json"
check_file "src/i18n/locales/zh.json"
echo ""

echo "Checking Types..."
echo "─────────────────────────────────"
check_dir "src/types"
check_file "src/types/index.ts"
echo ""

echo "Checking Utilities..."
echo "─────────────────────────────────"
check_dir "src/utils"
check_file "src/utils/formatters.ts"
check_file "src/utils/helpers.ts"
echo ""

echo "Checking Styles..."
echo "─────────────────────────────────"
check_dir "src/styles"
check_file "src/styles/App.css"
check_file "src/styles/Button.module.css"
check_file "src/styles/Card.module.css"
check_file "src/styles/Cart.module.css"
check_file "src/styles/CartItem.module.css"
check_file "src/styles/Input.module.css"
check_file "src/styles/Loading.module.css"
check_file "src/styles/Modal.module.css"
check_file "src/styles/POSTerminal.module.css"
check_file "src/styles/Payment.module.css"
check_file "src/styles/PaymentProcessor.module.css"
check_file "src/styles/ProductCard.module.css"
check_file "src/styles/ProductCatalog.module.css"
check_file "src/styles/Receipt.module.css"
check_file "src/styles/TransactionHistory.module.css"
echo ""

# Summary
echo "═══════════════════════════════════════════════════════════"
echo "VALIDATION SUMMARY"
echo "═══════════════════════════════════════════════════════════"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo "✅ SUCCESS: All required files are present!"
    echo ""
    echo "Project Statistics:"
    echo "  • Components: 14"
    echo "  • Styles: 15"
    echo "  • Services: 4"
    echo "  • Hooks: 4"
    echo "  • Contexts: 2"
    echo "  • Languages: 5"
    echo "  • Total Files: 62+"
    echo ""
    echo "You can now run:"
    echo "  npm install    - Install dependencies"
    echo "  npm start      - Start development server"
    echo "  npm run build  - Build for production"
    echo ""
    exit 0
else
    echo "❌ FAILED: $ERRORS file(s) missing!"
    echo ""
    echo "Please ensure all files are properly created."
    echo ""
    exit 1
fi
