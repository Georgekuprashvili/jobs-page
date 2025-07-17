export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8">
      <div className="flex flex-wrap justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold">JobsGE</h4>
          <p className="text-sm">საქართველოს წამყვანი ვაკანსიების პლატფორმა</p>
        </div>
        <div>
          <h5 className="font-semibold mb-2">სწრაფი ბმულები</h5>
          <ul className="space-y-1 text-sm">
            <li>ვაკანსიები</li>
            <li>კომპანიები</li>
            <li>ჩვენ შესახებ</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">კონტაქტი</h5>
          <p className="text-sm">info@jobsge.com</p>
          <p className="text-sm">+995 555 123 456</p>
        </div>
      </div>
    </footer>
  );
}
