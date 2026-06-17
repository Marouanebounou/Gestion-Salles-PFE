import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const { login, loginDemo, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ nom: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await signup(form.nom, form.email, form.password);
        await login(form.email, form.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <span className="logo-icon">🏫</span>
          <h1>Gestion des Salles</h1>
        </div>

        <div className="login-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Connexion
          </button>
          <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
            Inscription
          </button>
        </div>

        <form onSubmit={submit} className="login-form">
          {mode === 'signup' && (
            <div className="field">
              <label>Nom complet</label>
              <input name="nom" value={form.nom} onChange={handle} required placeholder="Votre nom" />
            </div>
          )}
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handle} required placeholder="email@example.com" />
          </div>
          <div className="field">
            <label>Mot de passe</label>
            <input name="password" type="password" value={form.password} onChange={handle} required placeholder="••••••••" />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Chargement…' : mode === 'login' ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        <div className="demo-separator">
          <span>ou</span>
        </div>

        <button
          className="btn-demo"
          onClick={() => { loginDemo(); navigate('/'); }}
        >
          Tester sans compte (Mode Démo)
        </button>
      </div>
    </div>
  );
}
