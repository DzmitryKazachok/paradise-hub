# The Paradise Hub

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Auth.js](https://img.shields.io/badge/Auth.js-Google_OAuth-7C3AED?logo=auth0&logoColor=white)](https://authjs.dev/)

The Paradise Hub is the guest-facing booking website, a fictional luxury cabin retreat located in the wilderness. Visitors can explore available cabins, filter them by capacity, check booked dates, and reserve a stay. Authenticated guests also receive a personal account area where they can manage reservations and update their profile.

The project demonstrates a modern full-stack Next.js architecture built around React Server Components, Server Actions, Auth.js authentication, and Supabase-backed data.

## Features

- Browse luxury cabins with capacity, pricing, discounts, and property details.
- Filter the cabin catalog by guest capacity without a full page reload.
- View dynamically generated cabin detail pages and metadata.
- Select an available date range with minimum and maximum stay rules.
- See real-time price calculations based on dates, nightly rate, and discount.
- Sign in securely with Google through Auth.js.
- Create reservations and receive a confirmation page.
- View upcoming and past reservations in a protected guest area.
- Edit or delete upcoming reservations with server-side ownership checks.
- Update nationality and national ID information in the guest profile.
- Handle loading, error, not-found, and empty states through the App Router.
- Serve optimized local and Supabase-hosted images with `next/image`.

## Tech Stack

| Area                 | Technology                                           |
| -------------------- | ---------------------------------------------------- |
| Framework            | Next.js 14 App Router                                |
| UI                   | React 18, React Server Components, Client Components |
| Styling              | Tailwind CSS 3                                       |
| Authentication       | Auth.js / NextAuth v5 with Google OAuth              |
| Database and storage | Supabase                                             |
| Mutations            | Next.js Server Actions                               |
| Date handling        | date-fns, React DayPicker                            |
| Icons                | Heroicons                                            |
| Code quality         | ESLint, Next.js ESLint configuration                 |

## Application Architecture

The application uses Server Components by default for data fetching and rendering. Interactive controls such as filters, the date picker, and reservation state are implemented as Client Components. Mutations run through Server Actions, which authenticate the current user, validate ownership where required, write to Supabase, and revalidate affected routes.

Supabase provides four main data domains:

- `cabins` stores cabin descriptions, capacities, prices, discounts, and image URLs.
- `bookings` stores reservation dates, guest counts, prices, status, and cabin/guest relationships.
- `guests` stores accounts created after the first successful Google sign-in.
- `settings` stores global booking constraints such as minimum and maximum stay length.

The route middleware protects the guest account area, while booking update and deletion actions perform an additional ownership check on the server.

## Routes

| Route                                    | Description                                   | Access                              |
| ---------------------------------------- | --------------------------------------------- | ----------------------------------- |
| `/`                                      | Landing page                                  | Public                              |
| `/about`                                 | Property story and retreat overview           | Public                              |
| `/cabins`                                | Filterable cabin catalog                      | Public                              |
| `/cabins/[cabinId]`                      | Cabin details, availability, and booking form | Public; sign-in required to reserve |
| `/cabins/thankyou`                       | Reservation confirmation                      | Public                              |
| `/login`                                 | Google sign-in page                           | Public                              |
| `/account`                               | Guest dashboard                               | Authenticated                       |
| `/account/profile`                       | Guest profile editor                          | Authenticated                       |
| `/account/reservations`                  | Reservation history and management            | Authenticated                       |
| `/account/reservations/edit/[bookingId]` | Reservation editor                            | Authenticated owner                 |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or newer
- npm
- A [Supabase](https://supabase.com/) project
- A Google OAuth application configured in [Google Cloud Console](https://console.cloud.google.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DzmitryKazachok/paradise-hub.git
   cd paradise-hub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell, use:

   ```powershell
   Copy-Item .env.example .env.local
   ```

4. Add the required environment variables:

   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SECRET_KEY=your_supabase_secret_key

   AUTH_SECRET=your_random_auth_secret
   AUTH_GOOGLE_ID=your_google_oauth_client_id
   AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
   ```

   `SUPABASE_SECRET_KEY` is used only by server-side code and must never be exposed through a `NEXT_PUBLIC_` variable or committed to source control.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Service Configuration

### Supabase

Create the `cabins`, `bookings`, `guests`, and `settings` tables in your Supabase project. At minimum, the application expects the following fields:

| Table      | Required fields used by the application                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cabins`   | `id`, `name`, `description`, `maxCapacity`, `regularPrice`, `discount`, `image`                                                                                             |
| `bookings` | `id`, `created_at`, `startDate`, `endDate`, `numNights`, `numGuests`, `observations`, `totalPrice`, `extrasPrice`, `isPaid`, `hasBreakfast`, `status`, `cabinId`, `guestId` |
| `guests`   | `id`, `fullName`, `email`, `nationality`, `nationalID`, `countryFlag`                                                                                                       |
| `settings` | `minBookingLength`, `maxBookingLength`                                                                                                                                      |

Configure foreign-key relationships from `bookings.cabinId` to `cabins.id` and from `bookings.guestId` to `guests.id`.

Cabin images are expected to be publicly readable. If you use a different Supabase project or storage host, update the remote image pattern in `next.config.mjs`.

### Google OAuth

Create a Web application OAuth client and add this local callback URL:

```text
http://localhost:3000/api/auth/callback/google
```

For production, add the equivalent callback URL for your deployed domain and configure the same environment variables in the hosting platform.

## Available Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Starts the development server                |
| `npm run build` | Creates an optimized production build        |
| `npm run start` | Runs the production server after a build     |
| `npm run prod`  | Builds and starts the production application |
| `npm run lint`  | Runs the Next.js ESLint checks               |

## Project Structure

```text
app/
|-- _components/             Shared server and client UI components
|-- _lib/                    Authentication, data access, and Server Actions
|-- _styles/                 Global styles
|-- about/                   About page
|-- account/                 Protected guest dashboard and reservation tools
|-- api/auth/                Auth.js route handlers
|-- cabins/                  Cabin catalog, detail, and confirmation routes
|-- error.js                 Global error boundary
|-- layout.js                Root layout and application metadata
|-- loading.js               Global loading state
|-- not-found.js             Global 404 page
`-- page.js                  Landing page
data/                        Local country reference data
public/                      Static images and branding assets
middleware.js                Authentication middleware
next.config.mjs              Next.js and remote image configuration
tailwind.config.js           Design tokens and Tailwind configuration
```

## Deployment

The application can be deployed to [Vercel](https://vercel.com/) or any platform that supports Next.js server rendering.

1. Import the GitHub repository into your hosting provider.
2. Add all variables listed in the environment configuration section.
3. Add the production Auth.js callback URL to the Google OAuth client.
4. Confirm that the Supabase image host is allowed in `next.config.mjs`.
5. Run `npm run build` as the build command and `npm run start` as the start command when required by the platform.

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository and create a focused feature branch.
2. Make the change while following the existing project conventions.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request with a clear description of the behavior and any UI changes.

Do not commit `.env.local`, Supabase secrets, OAuth credentials, or other sensitive configuration!

## License

No license has been added to this repository yet. Until one is provided, the source code remains under the copyright of its owner and is not automatically licensed for reuse, modification, or distribution.
