export default function Footer() {
  return (
    <footer className="bg-brand-red text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-3">
              Delicious Bites Restaurant
            </h3>
            <p className="text-white/80">
              Experience culinary excellence in every bite. Fresh ingredients,
              authentic flavors, unforgettable moments.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-3">Contact Us</h4>
            <div className="space-y-2 text-white/80">
              <p>123 Gourmet Street</p>
              <p>Foodie City, FC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: hello@deliciousbites.com</p>
            </div>
          </div>

          {/* Column 3: Hours */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-3">Hours</h4>
            <div className="space-y-2 text-white/80">
              <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Delicious Bites Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
