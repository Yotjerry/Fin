
export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'ADMIN' | 'MERCHANT' | 'AGENT';
  agency?: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  bio?: string;
}

const AGENTS: User[] = [
  { id: '1', name: "Marius Ahonon", phone: "+22997000001", role: 'AGENT', agency: "Agence Cotonou Centre", status: 'ACTIVE', bio: "Expert en gestion de flux et relation client." },
  { id: '2', name: "Lisa Koukpaki", phone: "+22996000002", role: 'AGENT', agency: "Agence Calavi", status: 'PENDING', bio: "Spécialisée dans les remontées de fonds." },
  { id: '3', name: "Jean Koffi", phone: "+22995000003", role: 'AGENT', agency: "Agence Porto-Novo", status: 'ACTIVE', bio: "Responsable des collectes de proximité." },
];

const MERCHANTS: User[] = [
  { id: 'm1', name: "Jean Marchand", email: "marchand@fintrack.bj", role: 'MERCHANT', status: 'ACTIVE' },
  { id: 'm2', name: "Awa Diop", email: "awa@fintrack.bj", role: 'MERCHANT', status: 'ACTIVE' },
];

const ADMINS: User[] = [
  { id: 'a1', name: "Jerry Yotto", email: "jerryyotto@gmail.com", role: 'ADMIN', status: 'ACTIVE' },
];

// Mock PINs for Agents (in a real app, these would be hashed in DB)
const AGENT_PINS: Record<string, string> = {
  "+22997000001": "123456",
  "+22996000002": "123456",
  "+22995000003": "123456",
};

export const mockAuthService = {
  loginWithEmail: async (email: string, pass: string): Promise<User> => {
    // Basic mock login
    const user = [...MERCHANTS, ...ADMINS].find(u => u.email === email);
    if (!user) throw new Error("Utilisateur non trouvé");
    if (pass.length < 4) throw new Error("Mot de passe incorrect");
    return user;
  },

  loginAgent: async (phone: string, pin: string): Promise<{ user: User, isFirstLogin: boolean }> => {
    // Normalize phone (remove spaces)
    const normalizedPhone = phone.replace(/\s/g, "");
    const agent = AGENTS.find(a => a.phone === normalizedPhone);
    
    if (!agent) throw new Error("Agent non trouvé avec ce numéro");
    
    const correctPin = AGENT_PINS[normalizedPhone];
    if (pin !== correctPin) throw new Error("Code PIN incorrect");

    return { 
      user: agent, 
      isFirstLogin: agent.status === 'PENDING' 
    };
  },

  updateAgentPin: async (phone: string, newPin: string): Promise<void> => {
    const normalizedPhone = phone.replace(/\s/g, "");
    AGENT_PINS[normalizedPhone] = newPin;
    const agent = AGENTS.find(a => a.phone === normalizedPhone);
    if (agent) {
      agent.status = 'ACTIVE';
    }
  }
};
