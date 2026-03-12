"use client"

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { useAuth } from "@/lib/auth-context"

export default function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const { user } = useAuth()
  
  const [scheme, setScheme] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [docs, setDocs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!slug) return;
    fetch(`http://127.0.0.1:8000/api/schemes/${slug}`)
      .then(r => r.json())
      .then(data => setScheme(data.scheme))
      .catch(e => console.error("Error loading scheme:", e));
  }, [slug]);

  if (!scheme) return (
    <PageLayout>
      <div className="max-w-2xl mx-auto p-6">
        <p>Loading scheme...</p>
      </div>
    </PageLayout>
  );

  const handleSubmit = async () => {
    if (!user) {
        alert("Please login to submit application")
        return
    }
    setSubmitted(true);
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2">
          Apply: {scheme.scheme_name}
        </h1>
        <p className="text-gray-600 mb-4">{scheme.benefits}</p>

        <h2 className="font-semibold text-lg mb-2">Required Documents</h2>
        <ul className="space-y-2 mb-6">
          {(scheme.required_documents || []).map((doc: string, i: number) => (
            <li key={i} className="flex items-center gap-3 
                                    bg-green-50 p-3 rounded-lg">
              <input type="checkbox" 
                     onChange={e => setDocs({...docs, [doc]: e.target.checked})}
                     className="accent-green-600 w-4 h-4" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-700 text-white py-3 rounded-xl 
                     font-bold text-lg hover:bg-green-800 transition"
        >
          Submit Application
        </button>

        {submitted && (
          <div className="mt-4 p-4 bg-green-100 rounded-xl text-green-800 
                          font-semibold text-center">
            ✅ Application submitted for {scheme.scheme_name}!
          </div>
        )}
      </div>
    </PageLayout>
  );
}
