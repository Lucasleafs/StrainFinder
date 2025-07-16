# StrainMatch - Cannabis Wellness Recommendation App

A comprehensive cannabis strain recommendation web application built with React, TypeScript, and Tailwind CSS. StrainMatch helps users discover cannabis strains based on their preferences, medical needs, and desired effects.

## 🌿 Features

### Core Functionality
- **Personalized Recommendations**: AI-powered strain suggestions based on user preferences
- **Comprehensive Database**: 15+ detailed cannabis strains with complete profiles
- **Advanced Search & Filtering**: Search by effects, flavors, medical uses, and more
- **Educational Content**: Learn about terpenes, effects, and cannabis basics
- **User Profiles**: Save favorites, track experiences, and manage preferences

### Product Categories
- **Cannabis Strains**: Detailed strain profiles with genetics, effects, and growing info
- **Concentrates**: Extracts, wax, shatter, and rosin products
- **Edibles**: Gummies, chocolates, beverages, and baked goods
- **Cartridges**: Vape cartridges with various extraction methods
- **Educational Tools**: Interactive terpene wheel and learning modules

### User Experience
- **Age Verification**: Compliant age verification system
- **Onboarding Flow**: Guided setup to understand user preferences
- **Responsive Design**: Optimized for desktop and mobile devices
- **Accessibility**: Screen reader friendly with proper contrast ratios

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with ES6 support

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000)

### Project Structure
```
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   └── ...             # Feature-specific components
├── contexts/           # React context providers
├── data/              # Static data and databases
├── hooks/             # Custom React hooks
├── styles/            # CSS and styling files
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── App.tsx            # Main application component
```

## 🎨 Design System

### Color Palette
- **Primary Green**: Deep forest greens for primary actions
- **Purple Accents**: Soft purples for highlights and variety
- **Earth Tones**: Beiges and natural colors for warmth
- **Muted Backgrounds**: Soft gradients for wellness aesthetic

### Typography
- **Headings**: Medium weight sans-serif for clarity
- **Body Text**: Regular weight with optimal line height
- **UI Elements**: Consistent sizing and spacing system

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Cannabis-themed primary and secondary styles
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with clear section indicators

## 📊 Data Structure

### Strain Properties
Each strain includes comprehensive information:
- Basic info (name, type, THC/CBD levels)
- Effects and flavors arrays
- Medical uses and genetics
- Growing information and difficulty
- Dispensary availability and pricing
- User ratings and review counts

### Additional Products
- **Concentrates**: Extraction methods, consistency, potency
- **Edibles**: Dosage, onset time, ingredients, dietary info
- **Cartridges**: Hardware compatibility, terpene profiles

## 🔧 Technical Implementation

### State Management
- **React Context**: Global app state with AppContext
- **Local Storage**: Persistent user preferences and favorites
- **Component State**: Local UI state management

### Key Technologies
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first styling with custom design system
- **Lucide React**: Consistent icon library
- **shadcn/ui**: High-quality component library

### Performance Optimizations
- **Code Splitting**: Lazy loading for better initial load times
- **Image Optimization**: Proper image loading and fallbacks
- **Memoization**: Optimized re-renders for complex components

## 🎯 User Flow

1. **Age Verification**: Legal compliance check
2. **Onboarding**: Preference collection and setup
3. **Home Dashboard**: Personalized recommendations
4. **Product Discovery**: Search, filter, and explore
5. **Detailed Views**: Comprehensive product information
6. **Profile Management**: Favorites, reviews, and settings

## 🧪 Development

### Available Scripts
- `npm start`: Development server
- `npm build`: Production build
- `npm test`: Run test suite
- `npm lint`: Code linting

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Conventional Commits**: Structured commit messages

## 🔒 Compliance & Safety

### Age Verification
- Compliant age verification system
- Persistent verification status
- Clear legal disclaimers

### Content Guidelines
- Educational focus on cannabis wellness
- Medical information with proper disclaimers
- Responsible use messaging

### Privacy
- Local storage for user preferences
- No personal data collection
- Transparent data usage

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES6+, CSS Grid, Flexbox, CSS Custom Properties

## 🤝 Contributing

This codebase follows modern React best practices:
- Functional components with hooks
- TypeScript for type safety
- Responsive design principles
- Accessibility compliance
- Performance optimization

## 📄 License

This project is created for educational and demonstration purposes. Cannabis laws vary by jurisdiction - please comply with local regulations.

---

**StrainMatch** - Connecting users with cannabis wellness through personalized recommendations and education.