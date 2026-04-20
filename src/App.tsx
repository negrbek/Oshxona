/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import LiveMenu from './components/LiveMenu';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen bg-chocolate text-cream font-sans">
      <Hero />
      <LiveMenu />
      <Footer />
    </main>
  );
}

