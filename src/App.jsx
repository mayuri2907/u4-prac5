import { useRef, useState } from 'react';

function App() {
  // Step 1: Create React Refs to reference the DOM input elements directly
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const rememberRef = useRef(null);

  // State only used to store and display the submitted information
  const [submittedInfo, setSubmittedInfo] = useState(null);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Handle form submission by retrieving values directly from refs
  const handleSubmit = (e) => {
    e.preventDefault();

    // Read values directly from the DOM using .current.value
    const username = usernameRef.current ? usernameRef.current.value.trim() : '';
    const password = passwordRef.current ? passwordRef.current.value : '';
    const rememberMe = rememberRef.current ? rememberRef.current.checked : false;

    if (!username || !password) {
      setError('Please provide both Username and Password.');
      return;
    }

    setError('');
    // Store retrieved values
    setSubmittedInfo({
      username,
      passwordLength: password.length,
      maskedPassword: '•'.repeat(password.length),
      rememberMe,
      submittedAt: new Date().toLocaleTimeString(),
    });
  };

  // Step 3: Clear form fields using DOM reference
  const handleClear = () => {
    if (usernameRef.current) usernameRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
    if (rememberRef.current) rememberRef.current.checked = false;
    setSubmittedInfo(null);
    setError('');
    if (usernameRef.current) usernameRef.current.focus();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-slate-800">
              AuthPortal<span className="text-slate-900">.</span>
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
              U4-PRAC 5
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            Uncontrolled Form via useRef()
          </span>
        </div>
      </header>

      {/* Lab Banner */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-600 gap-1">
          <div>
            <span className="font-semibold text-slate-800">Practical 5:</span> Login Form (Uncontrolled Component using useRef)
          </div>
          <div className="text-slate-800 font-medium">
            ● Unit 4 – Forms & State Management
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Login Form Box */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-800 rounded border border-stone-200">
                Uncontrolled DOM Component
              </span>
              <h1 className="text-2xl font-bold text-slate-800 mt-2">
                User Login Form
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Form inputs manage their own state internally in the DOM. Values are extracted only upon submission using <code className="font-mono bg-slate-100 px-1 font-bold">useRef()</code>.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input - Uncontrolled */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Username or Student ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  ref={usernameRef}
                  defaultValue=""
                  placeholder="Enter username (e.g. mayuri29)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              {/* Password Input - Uncontrolled */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                  >
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  ref={passwordRef}
                  defaultValue=""
                  placeholder="Enter secret password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              {/* Remember Me Checkbox - Uncontrolled */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  ref={rememberRef}
                  defaultChecked={false}
                  className="mr-2 rounded text-slate-800 focus:ring-slate-700"
                />
                <label htmlFor="remember" className="text-xs text-slate-600">
                  Remember this device for 30 days
                </label>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-slate-800 text-white rounded-md text-sm font-medium hover:bg-slate-900 transition shadow-xs"
                >
                  Sign In (Submit Form)
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="py-2.5 px-4 bg-slate-100 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-200 transition border border-slate-300"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Submission Output & Concept Notes */}
          <div className="lg:col-span-6 space-y-6">
            {/* Submitted Info Display */}
            {submittedInfo ? (
              <div className="bg-white p-6 rounded-xl border-2 border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 text-slate-900">
                  <span className="text-xl">✓</span>
                  <h3 className="font-bold text-base">
                    Submitted Credentials Retrieved!
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Retrieved from DOM nodes at: <span className="font-mono">{submittedInfo.submittedAt}</span>
                </p>

                <div className="border-t border-slate-200 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Retrieved Username:</span>
                    <span className="font-semibold text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
                      {submittedInfo.username}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Retrieved Password:</span>
                    <span className="font-semibold text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
                      {submittedInfo.maskedPassword} ({submittedInfo.passwordLength} chars)
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Remember Me:</span>
                    <span className="font-semibold text-slate-900">
                      {submittedInfo.rememberMe ? 'Yes (Checked)' : 'No (Unchecked)'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs">
                  <strong>How it was retrieved:</strong> In an uncontrolled component, React does not track each keystroke in state. When the submit button was clicked, values were read directly via:
                  <div className="font-mono text-[11px] mt-1 text-emerald-900 bg-white p-1.5 rounded border border-emerald-200">
                    usernameRef.current.value
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl border border-dashed border-slate-300 text-center text-slate-500 text-xs">
                Enter your credentials above and click <strong>Sign In</strong> to see the retrieved uncontrolled form data.
              </div>
            )}

            {/* Controlled vs Uncontrolled Comparison Table */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-semibold text-sm text-slate-800">
                Viva Concept: Controlled vs Uncontrolled Components
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-2 border-b border-slate-200">Feature</th>
                      <th className="p-2 border-b border-slate-200">Controlled Component</th>
                      <th className="p-2 border-b border-slate-200">Uncontrolled Component</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-600">
                    <tr>
                      <td className="p-2 font-medium text-slate-700">Data Source</td>
                      <td className="p-2">React state (useState)</td>
                      <td className="p-2">DOM itself (useRef)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium text-slate-700">Re-renders</td>
                      <td className="p-2">Re-renders on every keystroke</td>
                      <td className="p-2">No re-renders while typing</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium text-slate-700">Access Point</td>
                      <td className="p-2">Real-time state variable</td>
                      <td className="p-2">On demand (e.g. at form submit)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        React Practical 5 | Uncontrolled Form with useRef()
      </footer>
    </div>
  );
}

export default App;
