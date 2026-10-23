import React, { useState, useId } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Shield,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Search,
  Copy,
  Clock,
  Award,
  Layers,
  Wrench,
  Tent,
  Bug,
  Rat,
  Sparkle,
  TreePine,
  Zap,
  Building2,
  FileCheck2,
  Play,
  Flame,
  Check
} from 'lucide-react';

// Contact details for G.E.H.S.
const CONTACT_INFO = {
  phoneDisplay: '077 74 66 61',
  phoneDial: '+24177746661',
  whatsappDisplay: '077 579 994',
  whatsappNumber: '24177579994',
  email: 'gehspog@gmail.com',
  addressPOG: 'Ntchengué, face cité Ndaot, B.P. 798, Port-Gentil, Gabon',
  addressLBV: 'Cité Angondjé, Libreville, Gabon'
};

// 7 Primary Services with Real Live Images from Approved Mockup
interface ServiceItem {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  protocols: string[];
  equipment: string;
  image: string;
  badgeIcon: React.ReactNode;
}

const PRIMARY_SERVICES: ServiceItem[] = [
  {
    id: 'desinsectisation',
    category: 'Lutte anti-vectorielle',
    title: 'Désinsectisation',
    shortDesc: 'Solutions adaptées à la lutte contre les insectes nuisibles.',
    fullDesc:
      'Traitement préventif et curatif certifié contre les moustiques, cafards, puces, punaises de lit et insectes volants ou rampants. Application par pulvérisation résiduelle, nébulisation thermique et gel appât spécifique.',
    protocols: [
      'Diagnostic préliminaire des zones infestées',
      'Application ciblée de biocides agréés OMS',
      'Mesures de sécurité et délais de réintégration'
    ],
    equipment: 'Nébulisateurs thermiques, pulvérisateurs basse pression, gels d’appâtage ciblés',
    image: '/assets/services/service_desinsectisation.png',
    badgeIcon: <Bug className="w-4 h-4 text-[#0B3B2E]" />
  },
  {
    id: 'deratisation',
    category: 'Lutte anti-vectorielle',
    title: 'Dératisation',
    shortDesc: 'Prévention et traitement des problèmes liés aux rongeurs.',
    fullDesc:
      'Implantation de postes d’appâtage sécurisés fermés à clé, pièges mécaniques et rodonticides homologués pour éliminer durablement les rats et souris, protégeant vos câbles, denrées et entrepôts.',
    protocols: [
      'Plan de localisation des boîtes d’appâtage sécurisées',
      'Relevé systématique des consommations',
      'Conseils d’étanchéité des bâtiments (herméticité)'
    ],
    equipment: 'Postes d’appâtage polypropylène sécurisés, rodonticides de seconde génération',
    image: '/assets/services/service_deratisation.png',
    badgeIcon: <Rat className="w-4 h-4 text-[#0B3B2E]" />
  },
  {
    id: 'desinfection',
    category: 'Lutte anti-vectorielle',
    title: 'Désinfection',
    shortDesc: 'Prestations de désinfection adaptées aux besoins des espaces concernés.',
    fullDesc:
      'Bio-nettoyage et désinfection virucide, bactéricide et fongicide des locaux professionnels, cabinets médicaux, zones de vie, sanitaires et cantines avec brumisation ou pulvérisation fine.',
    protocols: [
      'Nettoyage préliminaire des souillures',
      'Brumisation à froid des volumes fermés',
      'Délivrance d’un compte-rendu d’intervention'
    ],
    equipment: 'Atomiseurs électriques ULV, désinfectants à large spectre homologués',
    image: '/assets/services/service_desinfection.png',
    badgeIcon: <Sparkle className="w-4 h-4 text-[#0B3B2E]" />
  },
  {
    id: 'nettoyage-industriel',
    category: 'Nettoyage & Entretien',
    title: 'Nettoyage industriel',
    shortDesc: 'Nettoyage et entretien des environnements professionnels et industriels.',
    fullDesc:
      'Nettoyage mécanique de sols industriels, dégraissage de dalles, remises en état après travaux, nettoyage de bases vie logistiques pétrolières et entretien régulier de bureaux et surfaces techniques.',
    protocols: [
      'Balayage et aspiration des poussières fines',
      'Monobrosse & autolaveuse haute pression',
      'Évacuation et tri selon les protocoles environnementaux'
    ],
    equipment: 'Autolaveuses autoportées, monobrosses industrielles, nettoyeurs haute pression',
    image: '/assets/services/service_nettoyage.png',
    badgeIcon: <Building2 className="w-4 h-4 text-[#0B3B2E]" />
  },
  {
    id: 'espaces-verts',
    category: 'Nettoyage & Entretien',
    title: 'Entretien des espaces verts',
    shortDesc: 'Entretien des espaces extérieurs et maintien d’un environnement soigné.',
    fullDesc:
      'Tonte mécanique soignée des pelouses, débroussaillage des abords d’installations, désherbage préventif, taille de haies et élagage sécurisé d’arbres pour un rendu soigné et sécurisé contre la prolifération de reptiles.',
    protocols: [
      'Tonte et désherbage réguliers',
      'Élagage sécurisé par opérateurs formés',
      'Ramassage et valorisation des déchets verts'
    ],
    equipment: 'Tondeuses autoportées et tractées, débroussailleuses professionnelles, perches d’élagage',
    image: '/assets/services/service_espaces_verts.png',
    badgeIcon: <TreePine className="w-4 h-4 text-[#0B3B2E]" />
  },
  {
    id: 'maintenance-technique',
    category: 'Maintenance technique',
    title: 'Entretien électrique et plomberie',
    shortDesc: 'Prestations d’entretien des installations électriques et de plomberie.',
    fullDesc:
      'Dépannage et maintenance multitechnique des bâtiments : sécurisation des tableaux électriques, dépannage plomberie et robinetterie, nettoyage et entretien des filtres de climatisation split et rafraîchissement des peintures.',
    protocols: [
      'Diagnostic préalable des pannes',
      'Remplacement par pièces conformes',
      'Vérification finale d’étanchéité et mise en service'
    ],
    equipment: 'Outillage professionnel de contrôle électrique, stations de manomètres climatisation, matériel de peinture',
    image: '/assets/services/service_maintenance.png',
    badgeIcon: <Zap className="w-4 h-4 text-[#0B3B2E]" />
  },
  {
    id: 'materiel-evenementiel',
    category: 'Location évènementielle',
    title: 'Location de matériel évènementiel',
    shortDesc: 'Solutions de location de matériel pour accompagner les besoins évènementiels.',
    fullDesc:
      'Location complète de matériel logistique pour vos réceptions d’entreprise, fêtes professionnelles, colloques ou cérémonies : tentes étanches de différentes tailles, chaises de réception, tréteaux, tables, couverts soignés et toilettes mobiles autonomes livrées et installées.',
    protocols: [
      'Livraison et montage sur site par nos équipes',
      'Nettoyage et contrôle de propreté préalable',
      'Démontage et enlèvement rapide'
    ],
    equipment: 'Chapiteaux modulaires étanches, mobilier plastique renforcé, sanitaires mobiles désinfectés',
    image: '/assets/services/service_evenementiel.png',
    badgeIcon: <Tent className="w-4 h-4 text-[#0B3B2E]" />
  }
];

// Live Field Interventions (from company footage)
const LIVE_INTERVENTIONS = [
  {
    title: 'Traitement Anti-Moustiques',
    subtitle: 'Nébulisation thermique extérieure',
    image: '/assets/video_frames/frame_04.jpg',
    tag: 'Lutte antivectorielle'
  },
  {
    title: 'Traitement Anti-Cafards',
    subtitle: 'Intervention ciblée en cuisine & restaurant',
    image: '/assets/video_frames/frame_02.jpg',
    tag: 'Désinsectisation'
  },
  {
    title: 'Traitement Curatif Termites',
    subtitle: 'Injection haute pression dans les bois & charpentes',
    image: '/assets/video_frames/frame_05.jpg',
    tag: 'Préservation bois'
  },
  {
    title: 'Répulsif Anti-Serpents',
    subtitle: 'Sécurisation des pourtours de résidences et sites',
    image: '/assets/video_frames/frame_07.jpg',
    tag: 'Sécurité périmètre'
  }
];

// Complete Catalog Data (Categories A through E)
const CATALOG_DATA = {
  catA: {
    title: 'A. Lutte anti-vectorielle',
    intro:
      'Des prestations adaptées aux besoins de prévention et de traitement des nuisibles, dans le respect des procédures de sécurité applicables et avec port strict des EPI (combinaisons intégrales, masques respiratoires à cartouche).',
    items: [
      { name: 'Désinsectisation', desc: 'Traitement des insectes rampants et volants (moustiques, cafards, punaises).', tag: 'Biocides homologués' },
      { name: 'Dératisation', desc: 'Dispositifs de capture, postes sécurisés et élimination ciblée des rongeurs.', tag: 'Sécurisé' },
      { name: 'Désinfection', desc: 'Assainissement microbien, bactéricide et virucide des locaux et surfaces.', tag: 'Haute hygiène' },
      { name: 'Fumigation', desc: 'Traitement sous protocole strict avec EPI respiratoires complets pour conteneurs et entrepôts.', tag: 'Protocole strict' },
      { name: 'Traitement des termites', desc: 'Protection chimique et mécanique des fondations, plinthes et maçonneries.', tag: 'Anti-termites' },
      { name: 'Traitement du bois et charpentes', desc: 'Application par imprégnation de solutions de préservation durable des ossatures bois.', tag: 'Protection bois' },
      { name: 'Répulsifs serpents & chauves-souris', desc: 'Solutions d’éloignement sécurisé et répulsif sans danger pour l’environnement.', tag: 'Sécurité périmètre' }
    ]
  },
  catB: {
    title: 'B. Nettoyage industriel & Espaces verts',
    intro:
      'Des solutions de nettoyage et d’entretien pour les espaces professionnels, les surfaces techniques, les abords extérieurs et les installations.',
    items: [
      { name: 'Nettoyage industriel', desc: 'Dalles d’ateliers, entrepôts logistiques, dégraissage et bases de vie pétrolières.', tag: 'Industriel' },
      { name: 'Ménage professionnel', desc: 'Entretien régulier et méticuleux de bureaux d’entreprises, sièges et commerces.', tag: 'Quotidien / Périodique' },
      { name: 'Curage & nettoyage des caniveaux', desc: 'Dégagement manuel et mécanique des voies d’évacuation des eaux pluviales.', tag: 'Assainissement' },
      { name: 'Entretien des surfaces', desc: 'Décapage, lustrage, métallisation et cristallisation des revêtements de sol.', tag: 'Sols & dalles' },
      { name: 'Espaces verts & Tonte', desc: 'Tonte régulière, désherbage soigné et entretien des massifs végétaux.', tag: 'Espaces extérieurs' },
      { name: 'Élagage sécurisé', desc: 'Taille de réduction, haubanage et sécurisation des branchages dangereux.', tag: 'Travaux en hauteur' },
      { name: 'Entretien des piscines', desc: 'Nettoyage régulier des bassins, aspiration du fond et maintien de la clarté de l’eau.', tag: 'Bassins' }
    ]
  },
  catC: {
    title: 'C. Maintenance technique',
    intro:
      'Des prestations de maintenance et d’entretien adaptées aux besoins des bâtiments, des installations et des locaux professionnels.',
    items: [
      { name: 'Électricité générale', desc: 'Maintenance préventive des tableaux, luminaires, prises et dépannages d’urgence.', tag: 'Normes électriques' },
      { name: 'Plomberie sanitaire', desc: 'Recherche de fuites, entretien de robinetterie, raccordements et débouchage.', tag: 'Sanitaire' },
      { name: 'Froid & Climatisation', desc: 'Nettoyage des filtres, désinfection des split systems, contrôle de pression et recharge.', tag: 'Climatisation' },
      { name: 'Peinture bâtiment', desc: 'Rafraîchissement intérieur de bureaux et réfection soignée des façades extérieures.', tag: 'Rénovation' }
    ]
  },
  catD: {
    title: 'D. Location évènementielle',
    intro:
      'Des équipements évènementiels complets pour accompagner l’organisation de vos manifestations professionnelles et réceptions privées.',
    items: [
      { name: 'Tentes & Chapiteaux', desc: 'Abris étanches modulaires de différentes capacités pour vos réceptions en extérieur.', tag: 'Structure étanche' },
      { name: 'Chaises de réception', desc: 'Mobilier soigné, robuste et confortable adapté aux conférences et banquets.', tag: 'Mobilier' },
      { name: 'Tréteaux & Tables', desc: 'Structures modulables faciles à agencer pour buffets, repas assis ou stands.', tag: 'Modulaire' },
      { name: 'Couverts & Vaisselle', desc: 'Assortiments complets de vaisselle pour le service élégant de vos convives.', tag: 'Service table' },
      { name: 'Toilettes mobiles autonomes', desc: 'Sanitaires autonomes livrés propres, opérationnels et régulièrement vidangés.', tag: 'Sanitaires' }
    ]
  },
  catE: {
    title: 'E. Certificat phytosanitaire',
    intro:
      'Renseignements et accompagnement concernant les démarches liées au certificat phytosanitaire, selon les prestations effectivement proposées par G.E.H.S.',
    items: [
      {
        name: 'Accompagnement démarches phytosanitaires',
        desc: 'Assistance technique pour la préparation, les contrôles et les traitements préventifs requis avant constatation par les services compétents.',
        tag: 'Accompagnement'
      },
      {
        name: 'Traitement préalable de conteneurs & bois',
        desc: 'Fumigation et traitement certifié du bois d’emballage et palettes avant expédition maritime ou terrestre.',
        tag: 'Conformité fret'
      }
    ]
  }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCatalogTab, setActiveCatalogTab] = useState<'catA' | 'catB' | 'catC' | 'catD' | 'catE'>('catA');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Quote Form State
  const [formState, setFormState] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    serviceCategory: '',
    interventionCity: 'Port-Gentil',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [copiedContact, setCopiedContact] = useState(false);

  const fullNameId = useId();
  const companyId = useId();
  const phoneId = useId();
  const emailId = useId();
  const serviceCategoryId = useId();
  const interventionCityId = useId();
  const messageId = useId();

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectServiceForQuote = (serviceName: string) => {
    setFormState(prev => ({ ...prev, serviceCategory: serviceName }));
    setSelectedService(null);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName.trim() || !formState.phone.trim() || !formState.email.trim() || !formState.serviceCategory || !formState.message.trim()) {
      setFormError('Veuillez renseigner tous les champs obligatoires (*) pour soumettre votre demande.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Bonjour G.E.H.S., je vous contacte depuis le site web.\nNom : ${formState.fullName || 'Client'}\nPrestation souhaitée : ${formState.serviceCategory || 'Renseignement général'}\nVille : ${formState.interventionCity}\nMessage : ${formState.message || 'Demande de devis'}`
    );
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(CONTACT_INFO.phoneDial);
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2000);
  };

  // Filtered catalog items
  const allCatalogItems = Object.entries(CATALOG_DATA).flatMap(([catKey, catVal]) =>
    catVal.items.map(item => ({ ...item, categoryKey: catKey, categoryTitle: catVal.title }))
  );

  const searchResults = catalogSearch.trim()
    ? allCatalogItems.filter(
        item =>
          item.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
          item.desc.toLowerCase().includes(catalogSearch.toLowerCase()) ||
          item.tag.toLowerCase().includes(catalogSearch.toLowerCase())
      )
    : null;

  return (
    <div className="min-h-screen bg-white text-[#17211D] flex flex-col font-sans">
      
      {/* =========================================================================
          1. HEADER (Official Mascot Logo + Clean Nav Links + Primary Action)
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E0E7E3] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            
            {/* Zone 1: Official Logo with Mascot pushing lawnmower */}
            <a href="#top" className="flex items-center shrink-0 group" aria-label="G.E.H.S. Accueil">
              <img
                src="/assets/gehs_logo.png"
                alt="Logo officiel G.E.H.S. Hygiène & Services avec mascotte tondeuse"
                className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </a>

            {/* Zone 2: Navigation Links (single line, subtle hover underline) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#17211D]" aria-label="Navigation principale">
              <a href="#hero" className="text-[#0B3B2E] relative py-1 transition-colors whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#E7B83C]">
                Accueil
              </a>
              <a href="#services" className="hover:text-[#0B3B2E] relative py-1 transition-colors whitespace-nowrap">
                Nos services
              </a>
              <a href="#interventions-terrain" className="hover:text-[#0B3B2E] relative py-1 transition-colors whitespace-nowrap">
                Sur le terrain
              </a>
              <a href="#catalogue" className="hover:text-[#0B3B2E] relative py-1 transition-colors whitespace-nowrap">
                Catalogue complet
              </a>
              <a href="#a-propos" className="hover:text-[#0B3B2E] relative py-1 transition-colors whitespace-nowrap">
                À propos
              </a>
              <a href="#pourquoi-nous" className="hover:text-[#0B3B2E] relative py-1 transition-colors whitespace-nowrap">
                Pourquoi nous
              </a>
              <a href="#contact" className="hover:text-[#0B3B2E] relative py-1 transition-colors whitespace-nowrap">
                Contact
              </a>
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0B3B2E] hover:bg-[#145C45] rounded transition-all whitespace-nowrap shadow-xs hover:shadow-md"
              >
                Demander un devis &rarr;
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded text-[#0B3B2E] hover:bg-[#F4F7F5] focus:outline-hidden"
                aria-expanded={mobileMenuOpen}
                aria-label="Ouvrir le menu de navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E0E7E3] px-5 py-6 space-y-4 shadow-lg animate-fadeIn">
            <nav className="flex flex-col space-y-3 font-semibold text-base">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-[#0B3B2E] py-2 border-b border-[#F4F7F5]">
                Accueil
              </a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-[#17211D] hover:text-[#0B3B2E] py-2 border-b border-[#F4F7F5]">
                Nos 7 Services phares
              </a>
              <a href="#interventions-terrain" onClick={() => setMobileMenuOpen(false)} className="text-[#17211D] hover:text-[#0B3B2E] py-2 border-b border-[#F4F7F5]">
                Interventions terrain &amp; Vidéo
              </a>
              <a href="#catalogue" onClick={() => setMobileMenuOpen(false)} className="text-[#17211D] hover:text-[#0B3B2E] py-2 border-b border-[#F4F7F5]">
                Catalogue complet (A à E)
              </a>
              <a href="#a-propos" onClick={() => setMobileMenuOpen(false)} className="text-[#17211D] hover:text-[#0B3B2E] py-2 border-b border-[#F4F7F5]">
                À propos de G.E.H.S.
              </a>
              <a href="#pourquoi-nous" onClick={() => setMobileMenuOpen(false)} className="text-[#17211D] hover:text-[#0B3B2E] py-2 border-b border-[#F4F7F5]">
                Pourquoi nous choisir
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#17211D] hover:text-[#0B3B2E] py-2 border-b border-[#F4F7F5]">
                Contact &amp; Coordonnées
              </a>
            </nav>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 text-sm font-bold text-white bg-[#0B3B2E] hover:bg-[#145C45] rounded transition-colors"
              >
                Demander un devis &rarr;
              </a>
              <a
                href={`tel:${CONTACT_INFO.phoneDial}`}
                className="w-full text-center px-4 py-2.5 text-sm font-bold text-[#0B3B2E] border border-[#0B3B2E] hover:bg-[#F4F7F5] rounded transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Appeler le {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow" id="top">
        
        {/* =========================================================================
            2. HERO SECTION (Real Mockup Match: Split layout, Diagonal yellow divider, Real Team)
            ========================================================================= */}
        <section className="bg-grid-subtle border-b border-[#E0E7E3] relative overflow-hidden" id="hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:items-stretch">
              
              {/* Left Column: Brand message, CTAs, local roots */}
              <div className="lg:col-span-6 py-12 lg:py-16 pr-0 lg:pr-6 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#145C45] mb-4">
                  <span className="w-6 h-1 bg-[#E7B83C] rounded-xs" aria-hidden="true"></span>
                  G.E.H.S. — PORT-GENTIL
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B3B2E] font-heading leading-tight tracking-tight mb-4 text-balance">
                  Environnement propre, sains et bien entretenu.
                </h1>

                <p className="text-sm sm:text-base text-[#52635B] leading-relaxed mb-7 max-w-xl">
                  Des solutions professionnelles en hygiène, nettoyage, lutte contre les nuisibles et entretien.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 mb-8">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-[#0B3B2E] hover:bg-[#145C45] rounded transition-all shadow-xs hover:shadow-md"
                  >
                    Demander un devis &rarr;
                  </a>
                  <a
                    href={`tel:${CONTACT_INFO.phoneDial}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-[#0B3B2E] border border-[#0B3B2E] hover:bg-white rounded transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#0B3B2E]" />
                    Appeler le {CONTACT_INFO.phoneDisplay}
                  </a>
                </div>

                {/* Territorial Coverage & Regional Trust Signals */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#52635B] pt-2">
                  <MapPin className="w-4 h-4 text-[#0B3B2E] shrink-0" />
                  <span>
                    <strong className="text-[#0B3B2E]">Port-Gentil</strong> • Ogooué-Maritime • Gabon (Prestations à Libreville et sur tout le Gabon)
                  </span>
                </div>
              </div>

              {/* Right Column: Real Team & Headquarters with Diagonal Yellow Cut */}
              <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-full flex items-center justify-center">
                <div className="w-full h-full relative overflow-hidden rounded-md border border-[#E0E7E3] lg:border-none shadow-xs lg:shadow-none flex items-center">
                  <img
                    src="/assets/gehs_hero_team.png"
                    alt="Équipe G.E.H.S. en uniformes vert et jaune devant le siège d'exploitation à Port-Gentil"
                    className="w-full h-full object-cover object-right"
                  />
                  {/* Subtle video trigger pill */}
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute bottom-4 right-4 bg-[#0B3B2E]/90 hover:bg-[#0B3B2E] text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg backdrop-blur-xs flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-[#E7B83C] fill-[#E7B83C]" />
                    Voir l&apos;équipe en action (Vidéo)
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SERVICES SECTION (7 Cards with Real Live Action Photos from Mockup)
            ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header matching approved design */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#E7B83C] mb-1">
                <span className="w-5 h-0.5 bg-[#E7B83C]"></span>
                NOS SERVICES
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3B2E] font-heading tracking-tight">
                    Des solutions adaptées à vos besoins
                  </h2>
                  <p className="mt-2 text-sm text-[#52635B] max-w-2xl">
                    G.E.H.S. propose une gamme de services destinée à l&apos;entretien, l&apos;hygiène et la maintenance de vos espaces.
                  </p>
                </div>
                <a
                  href="#catalogue"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B3B2E] hover:text-[#F07828] transition-colors whitespace-nowrap group shrink-0"
                >
                  Voir tous les services &rarr;
                </a>
              </div>
            </div>

            {/* 7 Compact Cards with Real Photos & Yellow Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {PRIMARY_SERVICES.map((svc) => (
                <article
                  key={svc.id}
                  className="bg-white border border-[#E0E7E3] hover:border-[#145C45] rounded-md overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1 group"
                >
                  {/* Real Live Photo Slot */}
                  <div className="relative h-28 sm:h-32 bg-[#F4F7F5] overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    
                    {/* Overlapping Yellow Badge Icon */}
                    <div className="absolute -bottom-3 left-3 w-7 h-7 rounded-full bg-[#E7B83C] text-[#0B3B2E] shadow-sm flex items-center justify-center z-10 border border-white">
                      {svc.badgeIcon}
                    </div>
                  </div>

                  {/* Body matching approved mockup copy */}
                  <div className="p-3.5 pt-5 flex flex-col flex-grow">
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#0B3B2E] font-heading mb-1 group-hover:text-[#145C45]">
                      {svc.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#52635B] leading-relaxed mb-3 flex-grow">
                      {svc.shortDesc}
                    </p>

                    <div className="pt-2 border-t border-[#F4F7F5] flex items-center justify-between mt-auto">
                      <button
                        type="button"
                        onClick={() => setSelectedService(svc)}
                        className="text-[11px] font-bold text-[#0B3B2E] hover:text-[#F07828] inline-flex items-center gap-1 cursor-pointer"
                      >
                        Détails &rarr;
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectServiceForQuote(svc.title)}
                        className="text-[10px] font-bold text-[#F07828] hover:underline"
                      >
                        Devis direct
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            4. LIVE INTERVENTIONS SHOWCASE (Direct from G.E.H.S. Video Footage)
            ========================================================================= */}
        <section className="py-14 bg-[#F4F7F5] border-y border-[#E0E7E3]" id="interventions-terrain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F07828] block mb-1">
                  INTERVENTIONS EN DIRECT
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B3B2E] font-heading">
                  G.E.H.S. sur le terrain : Équipements de pointe &amp; Rigueur
                </h3>
                <p className="text-xs sm:text-sm text-[#52635B] mt-1">
                  Images réelles extraites de nos chantiers de traitement à Port-Gentil et Libreville.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0B3B2E] hover:bg-[#145C45] rounded transition-colors self-start md:self-auto cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#E7B83C] fill-[#E7B83C]" />
                Lancer la vidéo officielle (10s)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {LIVE_INTERVENTIONS.map((item, idx) => (
                <div key={idx} className="bg-white rounded-md border border-[#E0E7E3] overflow-hidden group shadow-2xs">
                  <div className="relative h-44 overflow-hidden bg-black/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold text-white bg-[#0B3B2E]/90 px-2 py-0.5 rounded backdrop-blur-xs">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B3B2E]">{item.title}</h4>
                    <p className="text-[11px] text-[#52635B] mt-1">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. ABOUT SECTION (Real Building Photo + Deep Green Brand Panel)
            ========================================================================= */}
        <section className="py-16 sm:py-20 bg-[#063B2D] text-white relative overflow-hidden" id="a-propos">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Real photo of G.E.H.S. building in Port-Gentil */}
              <div className="lg:col-span-6 space-y-3">
                <div className="rounded-lg overflow-hidden border-2 border-[#124D3D] shadow-xl relative group">
                  <img
                    src="/assets/aistudio/1523617199033_f14fba62.jpg"
                    alt="Bâtiment réel du siège G.E.H.S. à Ntchengué Port-Gentil"
                    className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="p-3 bg-[#04251C] text-xs text-[#B4CCC2] flex items-center justify-between border-t border-[#124D3D]">
                    <span>Siège d&apos;exploitation : <strong>Ntchengué, face cité Ndaot, Port-Gentil</strong></span>
                    <span className="text-[#E7B83C] font-semibold">B.P. 798</span>
                  </div>
                </div>

                {/* Secondary Photo Row: Real Courtyard with Event Tents */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded overflow-hidden border border-[#124D3D] relative h-28 group">
                    <img
                      src="/assets/aistudio/images_0f9ca378.jpg"
                      alt="Parc de matériel évènementiel au siège G.E.H.S."
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="absolute bottom-1.5 left-2 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">
                      Cour &amp; Matériel évènementiel
                    </span>
                  </div>
                  <div className="rounded overflow-hidden border border-[#124D3D] relative h-28 group">
                    <img
                      src="/assets/video_frames/frame_01.jpg"
                      alt="Équipe G.E.H.S. en formation devant les locaux"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="absolute bottom-1.5 left-2 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">
                      Équipe technique certifiée
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Text Block matching mockup */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#E7B83C] mb-2">
                    <span className="w-5 h-0.5 bg-[#E7B83C]"></span>
                    À PROPOS DE G.E.H.S.
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
                    Une entreprise locale, des services essentiels.
                  </h2>
                </div>

                <p className="text-base text-[#E2ECE7] leading-relaxed">
                  Basée à Port-Gentil, dans la province de l’Ogooué-Maritime, G.E.H.S. propose des prestations en hygiène, nettoyage, lutte contre les nuisibles, entretien des espaces verts et services techniques.
                </p>

                <p className="text-sm text-[#B4CCC2] leading-relaxed">
                  Des solutions adaptées aux besoins de vos espaces et de vos activités, au service des particuliers, des entreprises et des sites industriels. Présente historiquement à Port-Gentil avec un point de contact à Libreville (Cité Angondjé), notre équipe déploie ses interventions au Gabon et au-delà selon la nature des projets.
                </p>

                {/* Slogan pill from official flyer */}
                <div className="bg-[#04251C] px-4 py-2.5 rounded border border-[#124D3D] text-xs font-semibold text-[#E7B83C] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#E7B83C]" />
                  <span>« Le geste utile pour la santé » — Devise officielle G.E.H.S.</span>
                </div>

                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-[#063B2D] bg-[#E7B83C] hover:bg-[#f5c74c] rounded transition-colors"
                  >
                    Demander un devis &rarr;
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            6. CATALOGUE COMPLET DÉTAILLÉ (Catégories A à E + Live Filter)
            ========================================================================= */}
        <section className="py-16 bg-white border-b border-[#E0E7E3]" id="catalogue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F4F7F5] rounded-lg border border-[#E0E7E3] p-6 sm:p-8">
              
              {/* Header with Search Filter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E0E7E3]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#F07828]">
                    <Layers className="w-4 h-4" />
                    Catalogue complet des prestations
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B3B2E] font-heading mt-1">
                    Toutes nos interventions au Gabon &amp; International
                  </h3>
                </div>

                {/* Instant Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#52635B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Filtrer un service..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#E0E7E3] rounded focus:outline-hidden focus:ring-2 focus:ring-[#0B3B2E]"
                  />
                  {catalogSearch && (
                    <button
                      type="button"
                      onClick={() => setCatalogSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Live Search Results View (if user is searching) */}
              {searchResults ? (
                <div>
                  <div className="text-xs font-semibold text-[#52635B] mb-4">
                    {searchResults.length} prestation(s) trouvée(s) pour &quot;{catalogSearch}&quot; :
                  </div>
                  {searchResults.length === 0 ? (
                    <p className="text-sm text-[#52635B] py-8 text-center">
                      Aucune prestation ne correspond à votre recherche. Contactez-nous directement pour vos besoins sur mesure.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map((item, idx) => (
                        <div key={idx} className="p-4 bg-white rounded border border-[#E0E7E3] flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-[#F07828] uppercase block mb-1">
                              {item.categoryTitle}
                            </span>
                            <div className="text-sm font-bold text-[#0B3B2E]">{item.name}</div>
                            <p className="text-xs text-[#52635B] mt-1">{item.desc}</p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-[#E0E7E3] flex items-center justify-between">
                            <span className="text-[11px] bg-[#F4F7F5] text-[#0B3B2E] px-2 py-0.5 rounded border border-[#E0E7E3] font-medium">
                              {item.tag}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSelectServiceForQuote(item.name)}
                              className="text-xs font-bold text-[#F07828] hover:underline"
                            >
                              Demander devis &rarr;
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Tabbed View */
                <div>
                  {/* Category Tabs */}
                  <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-[#E0E7E3]" role="tablist">
                    {(
                      [
                        { id: 'catA', label: 'A. Lutte anti-vectorielle' },
                        { id: 'catB', label: 'B. Nettoyage & Espaces verts' },
                        { id: 'catC', label: 'C. Maintenance technique' },
                        { id: 'catD', label: 'D. Location évènementielle' },
                        { id: 'catE', label: 'E. Certificat phytosanitaire' }
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeCatalogTab === tab.id}
                        onClick={() => setActiveCatalogTab(tab.id)}
                        className={`px-4 py-2 text-xs sm:text-sm font-bold rounded transition-colors whitespace-nowrap cursor-pointer ${
                          activeCatalogTab === tab.id
                            ? 'bg-[#0B3B2E] text-white shadow-xs'
                            : 'bg-white text-[#17211D] hover:bg-[#E0E7E3]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div>
                    <div className="border-l-3 border-[#E7B83C] pl-4 py-1.5 mb-6 text-xs sm:text-sm text-[#52635B] italic bg-white p-3 rounded-r">
                      &quot;{CATALOG_DATA[activeCatalogTab].intro}&quot;
                    </div>

                    {/* Category E Special Notice (Certificat phytosanitaire) */}
                    {activeCatalogTab === 'catE' && (
                      <div className="mb-6 p-4 rounded bg-[#FFF9EE] border border-[#F0D49C] text-[#724E08] text-xs sm:text-sm leading-relaxed">
                        <strong className="block mb-1 font-bold flex items-center gap-1.5 text-[#B45309]">
                          <FileCheck2 className="w-4 h-4" />
                          Renseignements et accompagnement réglementaire :
                        </strong>
                        G.E.H.S. assiste ses clients et partenaires industriels dans les contrôles sanitaires, la fumigation certifiée et les traitements préalables requis par les autorités compétentes avant établissement des attestations et certificats officiels.
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {CATALOG_DATA[activeCatalogTab].items.map((sub, i) => (
                        <div
                          key={i}
                          className="bg-white p-4 rounded border border-[#E0E7E3] hover:border-[#145C45] transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-bold text-[#0B3B2E]">{sub.name}</span>
                              <span className="text-[10px] font-semibold text-[#145C45] bg-[#F4F7F5] px-2 py-0.5 rounded">
                                {sub.tag}
                              </span>
                            </div>
                            <p className="text-xs text-[#52635B] leading-relaxed mt-1">{sub.desc}</p>
                          </div>

                          <div className="mt-4 pt-2.5 border-t border-[#F4F7F5] flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleSelectServiceForQuote(sub.name)}
                              className="text-xs font-bold text-[#F07828] hover:text-[#d46419] inline-flex items-center gap-1 cursor-pointer"
                            >
                              Sélectionner pour devis &rarr;
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. POURQUOI NOUS CHOISIR
            ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E0E7E3]" id="pourquoi-nous">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F07828] block mb-2">
                NOS ENGAGEMENTS TERRAIN
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3B2E] font-heading">
                Pourquoi faire appel à G.E.H.S. ?
              </h2>
              <p className="mt-3 text-sm text-[#52635B]">
                Des garanties opérationnelles claires pour la maintenance, la propreté et la conformité de vos installations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F4F7F5] rounded border border-[#E0E7E3] hover:border-[#145C45] transition-all">
                <div className="w-11 h-11 rounded bg-[#0B3B2E] text-[#E7B83C] flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B3B2E] mb-2 font-heading">
                  Une offre de services polyvalente
                </h3>
                <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed">
                  Un interlocuteur unique pour l’hygiène, la désinfection, l’entretien des espaces et la maintenance technique.
                </p>
              </div>

              <div className="p-6 bg-[#F4F7F5] rounded border border-[#E0E7E3] hover:border-[#145C45] transition-all">
                <div className="w-11 h-11 rounded bg-[#0B3B2E] text-[#E7B83C] flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B3B2E] mb-2 font-heading">
                  Une entreprise implantée à Port-Gentil
                </h3>
                <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed">
                  Un ancrage local solide à Ntchengué permettant réactivité, proximité et connaissance approfondie des exigences locales.
                </p>
              </div>

              <div className="p-6 bg-[#F4F7F5] rounded border border-[#E0E7E3] hover:border-[#145C45] transition-all">
                <div className="w-11 h-11 rounded bg-[#0B3B2E] text-[#E7B83C] flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B3B2E] mb-2 font-heading">
                  Des prestations adaptées aux besoins
                </h3>
                <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed">
                  Interventions ponctuelles d’urgence ou contrats d’entretien périodiques dimensionnés à vos structures.
                </p>
              </div>

              <div className="p-6 bg-[#F4F7F5] rounded border border-[#E0E7E3] hover:border-[#145C45] transition-all">
                <div className="w-11 h-11 rounded bg-[#0B3B2E] text-[#E7B83C] flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B3B2E] mb-2 font-heading">
                  Hygiène, entretien et maintenance
                </h3>
                <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed">
                  Des méthodes respectueuses des règles de sécurité au travail et des fiches techniques des produits homologués.
                </p>
              </div>

              <div className="p-6 bg-[#F4F7F5] rounded border border-[#E0E7E3] hover:border-[#145C45] transition-all lg:col-span-2">
                <div className="w-11 h-11 rounded bg-[#0B3B2E] text-[#E7B83C] flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B3B2E] mb-2 font-heading">
                  Couverture au Gabon et au-delà
                </h3>
                <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed">
                  Capacité éprouvée de déploiement à Libreville et dans tout le Gabon selon la configuration et l’envergure des chantiers techniques et industriels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. CONTACT & DEVIS FORM
            ========================================================================= */}
        <section className="py-16 sm:py-20 bg-[#F4F7F5]" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F07828] block mb-1">
                CONTACTEZ-NOUS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3B2E] font-heading">
                Un besoin ? Parlons-en.
              </h2>
              <p className="mt-2 text-sm text-[#52635B] max-w-2xl">
                Contactez G.E.H.S. pour présenter votre besoin et obtenir des informations sur les prestations adaptées à votre situation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Direct Contacts Card */}
              <div className="lg:col-span-5 bg-[#0B3B2E] text-white rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-xl font-bold font-heading mb-2">Coordonnées officielles</h3>
                  <p className="text-xs sm:text-sm text-[#CFDFD8] mb-8 leading-relaxed">
                    Nos équipes sont joignables directement pour toute demande de devis, intervention d’urgence ou renseignement technique.
                  </p>

                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded bg-white/10 text-[#E7B83C] flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E7B83C] block">
                          Téléphone direct
                        </span>
                        <a href={`tel:${CONTACT_INFO.phoneDial}`} className="text-base font-bold text-white hover:underline">
                          {CONTACT_INFO.phoneDisplay}
                        </a>
                        <span className="text-xs text-[#ADC8BD] block">Format international : +241 77 74 66 61</span>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded bg-white/10 text-[#25D366] flex items-center justify-center shrink-0">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E7B83C] block">
                          WhatsApp Pro
                        </span>
                        <a
                          href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Bonjour%20GEHS,%20je%20souhaite%20obtenir%20des%20informations`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-bold text-white hover:text-[#25D366]"
                        >
                          {CONTACT_INFO.whatsappDisplay}
                        </a>
                        <span className="text-xs text-[#ADC8BD] block">wa.me/{CONTACT_INFO.whatsappNumber}</span>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded bg-white/10 text-[#E7B83C] flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E7B83C] block">
                          Courriel officiel
                        </span>
                        <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm font-semibold text-white hover:underline">
                          {CONTACT_INFO.email}
                        </a>
                      </div>
                    </div>

                    {/* Address Port-Gentil */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded bg-white/10 text-[#E7B83C] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E7B83C] block">
                          Siège Port-Gentil
                        </span>
                        <span className="text-xs sm:text-sm text-white font-medium block">
                          {CONTACT_INFO.addressPOG}
                        </span>
                      </div>
                    </div>

                    {/* Address Libreville */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded bg-white/10 text-[#E7B83C] flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E7B83C] block">
                          Antenne Libreville
                        </span>
                        <span className="text-xs sm:text-sm text-white font-medium block">
                          {CONTACT_INFO.addressLBV}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap gap-2.5">
                  <a
                    href={`tel:${CONTACT_INFO.phoneDial}`}
                    className="flex-1 min-w-[130px] px-3.5 py-2 text-xs font-bold text-[#0B3B2E] bg-[#E7B83C] hover:bg-[#edd067] rounded text-center transition-colors"
                  >
                    Appeler
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="flex-1 min-w-[130px] px-3.5 py-2 text-xs font-bold text-white bg-white/15 hover:bg-white/25 rounded text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedContact ? 'Copié !' : 'Copier numéro'}
                  </button>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="w-full px-3.5 py-2 text-xs font-bold text-white border border-white/20 hover:bg-white/10 rounded text-center transition-colors"
                  >
                    Envoyer un e-mail direct
                  </a>
                </div>
              </div>

              {/* Right Column: Quote Form */}
              <div className="lg:col-span-7 bg-white rounded-lg border border-[#E0E7E3] p-6 sm:p-8 shadow-xs">
                <h3 className="text-xl font-bold text-[#0B3B2E] font-heading mb-1">
                  Demande de devis en ligne
                </h3>
                <p className="text-xs sm:text-sm text-[#52635B] mb-6">
                  Remplissez ce formulaire pour recevoir un devis personnalisé adapté à votre structure et vos contraintes.
                </p>

                {formSubmitted ? (
                  <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded p-5 text-[#2E7D32] space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                      Demande enregistrée avec succès !
                    </div>
                    <p className="text-xs leading-relaxed text-[#1B5E20]">
                      Merci <strong>{formState.fullName}</strong>. Votre demande concernant la prestation <em>&quot;{formState.serviceCategory}&quot;</em> pour le site à <em>{formState.interventionCity}</em> a bien été préparée.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={handleWhatsAppDirect}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Transmettre directement sur WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormState({
                            fullName: '',
                            company: '',
                            phone: '',
                            email: '',
                            serviceCategory: '',
                            interventionCity: 'Port-Gentil',
                            message: ''
                          });
                        }}
                        className="px-3.5 py-2 text-xs font-semibold text-[#0B3B2E] bg-white border border-[#E0E7E3] rounded hover:bg-[#F4F7F5] cursor-pointer"
                      >
                        Nouvelle demande
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                    {formError && (
                      <div className="p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs rounded">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={fullNameId} className="block text-xs font-bold text-[#17211D] mb-1">
                          Nom complet <span className="text-red-600">*</span>
                        </label>
                        <input
                          id={fullNameId}
                          type="text"
                          name="fullName"
                          value={formState.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="Ex: Jean-Paul Mba"
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E0E7E3] rounded focus:outline-hidden focus:ring-2 focus:ring-[#0B3B2E]"
                        />
                      </div>

                      <div>
                        <label htmlFor={companyId} className="block text-xs font-bold text-[#17211D] mb-1">
                          Entreprise (facultatif)
                        </label>
                        <input
                          id={companyId}
                          type="text"
                          name="company"
                          value={formState.company}
                          onChange={handleInputChange}
                          placeholder="Nom de votre société"
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E0E7E3] rounded focus:outline-hidden focus:ring-2 focus:ring-[#0B3B2E]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={phoneId} className="block text-xs font-bold text-[#17211D] mb-1">
                          Téléphone <span className="text-red-600">*</span>
                        </label>
                        <input
                          id={phoneId}
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Ex: 077 XX XX XX"
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E0E7E3] rounded focus:outline-hidden focus:ring-2 focus:ring-[#0B3B2E]"
                        />
                      </div>

                      <div>
                        <label htmlFor={emailId} className="block text-xs font-bold text-[#17211D] mb-1">
                          Adresse e-mail <span className="text-red-600">*</span>
                        </label>
                        <input
                          id={emailId}
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          placeholder="nom@entreprise.ga"
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E0E7E3] rounded focus:outline-hidden focus:ring-2 focus:ring-[#0B3B2E]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={serviceCategoryId} className="block text-xs font-bold text-[#17211D] mb-1">
                          Service recherché <span className="text-red-600">*</span>
                        </label>
                        <select
                          id={serviceCategoryId}
                          name="serviceCategory"
                          value={formState.serviceCategory}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E0E7E3] rounded focus:outline-hidden focus:ring-2 focus:ring-[#0B3B2E]"
                        >
                          <option value="">Sélectionnez une prestation...</option>
                          <optgroup label="Lutte anti-vectorielle">
                            <option value="Désinsectisation">Désinsectisation (cafards, moustiques, puces)</option>
                            <option value="Dératisation">Dératisation (rats, souris)</option>
                            <option value="Désinfection">Désinfection virucide &amp; bactéricide</option>
                            <option value="Fumigation">Fumigation sous protocole strict</option>
                            <option value="Traitement termites">Traitement curatif termites</option>
                            <option value="Traitement bois">Traitement bois &amp; charpentes</option>
                            <option value="Répulsifs serpents">Répulsif serpents &amp; chauves-souris</option>
                          </optgroup>
                          <optgroup label="Nettoyage & Espaces verts">
                            <option value="Nettoyage industriel">Nettoyage industriel &amp; sols</option>
                            <option value="Ménage professionnel">Ménage professionnel de bureaux</option>
                            <option value="Curage caniveaux">Curage et nettoyage de caniveaux</option>
                            <option value="Entretien des surfaces">Entretien des surfaces techniques</option>
                            <option value="Entretien des espaces verts">Entretien des espaces verts &amp; tonte</option>
                            <option value="Élagage">Élagage sécurisé</option>
                            <option value="Entretien piscines">Entretien des piscines</option>
                          </optgroup>
                          <optgroup label="Maintenance technique">
                            <option value="Entretien électrique et plomberie">Entretien électrique et plomberie</option>
                            <option value="Froid & Climatisation">Froid &amp; Climatisation split</option>
                            <option value="Peinture">Peinture bâtiment</option>
                          </optgroup>
                          <optgroup label="Location évènementielle">
                            <option value="Location de matériel évènementiel">Location de tentes, chaises &amp; tables</option>
                            <option value="Toilettes mobiles">Toilettes mobiles autonomes</option>
                          </optgroup>
                          <optgroup label="Autre">
                            <option value="Démarche phytosanitaire">Accompagnement démarche certificat phytosanitaire</option>
                            <option value="Autre demande">Autre prestation spécifique</option>
                          </optgroup>
                        </select>
                      </div>

                      <div>
                        <label htmlFor={interventionCityId} className="block text-xs font-bold text-[#17211D] mb-1">
                          Lieu d&apos;intervention <span className="text-red-600">*</span>
                        </label>
                        <input
                          id={interventionCityId}
                          type="text"
                          name="interventionCity"
                          value={formState.interventionCity}
                          onChange={handleInputChange}
                          required
                          placeholder="Ex: Port-Gentil, Libreville..."
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E0E7E3] rounded focus:outline-hidden focus:ring-2 focus:ring-[#0B3B2E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={messageId} className="block text-xs font-bold text-[#17211D] mb-1">
                        Précisions sur votre besoin <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id={messageId}
                        name="message"
                        rows={3}
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Superficie approximative, type de locaux (villa, entrepôt, bureaux), fréquence souhaitée..."
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E0E7E3] rounded focus:outline-hidden focus:ring-2 focus:ring-[#0B3B2E]"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#0B3B2E] hover:bg-[#145C45] rounded transition-all shadow-xs cursor-pointer"
                      >
                        Envoyer ma demande &rarr;
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsAppDirect}
                        className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Transmettre via WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          9. FOOTER
          ========================================================================= */}
      <footer className="bg-[#04251C] text-[#A6BDB4] pt-14 pb-8 text-xs border-t border-[#124D3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Col 1: Brand Info & Mascot */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/gehs_logo.png"
                  alt="G.E.H.S."
                  className="h-10 w-auto object-contain bg-white rounded p-1"
                />
              </div>
              <p className="text-xs text-[#A6BDB4] leading-relaxed">
                Entreprise de services professionnels spécialisée dans l’hygiène, le nettoyage industriel, la lutte anti-vectorielle, les espaces verts, la maintenance technique et la location de matériel.
              </p>
              <div className="text-[11px] text-[#76968B]">
                Prestations assurées à Port-Gentil, Libreville, à travers tout le Gabon et au-delà.
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <div className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-[#124D3D] pb-2">
                Navigation
              </div>
              <ul className="space-y-2">
                <li><a href="#hero" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Nos 7 services phares</a></li>
                <li><a href="#interventions-terrain" className="hover:text-white transition-colors">Interventions en direct</a></li>
                <li><a href="#catalogue" className="hover:text-white transition-colors">Catalogue complet (A à E)</a></li>
                <li><a href="#a-propos" className="hover:text-white transition-colors">À propos de G.E.H.S.</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Demander un devis</a></li>
              </ul>
            </div>

            {/* Col 3: Spécialités */}
            <div>
              <div className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-[#124D3D] pb-2">
                Spécialités
              </div>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-white transition-colors">Désinsectisation &amp; Moustiques</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Dératisation &amp; Postes sécurisés</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Désinfection virucide &amp; ULV</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Nettoyage industriel &amp; Sols</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Entretien espaces verts &amp; Tonte</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Location de tentes &amp; Toilettes</a></li>
              </ul>
            </div>

            {/* Col 4: Implantations & Contacts */}
            <div>
              <div className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-[#124D3D] pb-2">
                Coordonnées
              </div>
              <div className="space-y-2.5 text-xs">
                <div>
                  <strong className="text-white block">Siège Port-Gentil :</strong>
                  <span>Ntchengué, face cité Ndaot, B.P. 798</span>
                </div>
                <div>
                  <strong className="text-white block">Antenne Libreville :</strong>
                  <span>Cité Angondjé, Libreville, Gabon</span>
                </div>
                <div className="pt-1">
                  <span>Tél : </span>
                  <a href={`tel:${CONTACT_INFO.phoneDial}`} className="text-white font-bold hover:underline">
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span>WhatsApp : </span>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                    className="text-[#25D366] font-bold hover:underline"
                  >
                    {CONTACT_INFO.whatsappDisplay}
                  </a>
                </div>
                <div>
                  <span>Courriel : </span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-white hover:underline">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom row */}
          <div className="pt-6 border-t border-[#124D3D] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#76968B]">
            <div>
              &copy; {new Date().getFullYear()} G.E.H.S. — Hygiène &amp; Services. Tous droits réservés.
            </div>
            <div>
              Port-Gentil • Libreville • Gabon et au-delà
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          10. MODAL SERVICE DETAILS
          ========================================================================= */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-[#04251C]/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-2xl border border-[#E0E7E3]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with image */}
            <div className="relative h-44 bg-[#0B3B2E]">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E7B83C] block">
                    {selectedService.category}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-white">{selectedService.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-3 right-3 text-white/90 hover:text-white p-1 rounded-full bg-black/40 hover:bg-black/60 cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 text-xs sm:text-sm">
              <div>
                <strong className="block text-xs font-bold uppercase text-[#0B3B2E] mb-1">
                  Description de la prestation :
                </strong>
                <p className="text-[#52635B] leading-relaxed">{selectedService.fullDesc}</p>
              </div>

              <div>
                <strong className="block text-xs font-bold uppercase text-[#0B3B2E] mb-1.5">
                  Protocoles &amp; Étapes d&apos;intervention :
                </strong>
                <ul className="space-y-1 text-[#52635B]">
                  {selectedService.protocols.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#145C45] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="block text-xs font-bold uppercase text-[#0B3B2E] mb-1">
                  Matériel &amp; Équipements mis en œuvre :
                </strong>
                <p className="text-[#52635B] text-xs bg-[#F4F7F5] p-2.5 rounded border border-[#E0E7E3]">
                  {selectedService.equipment}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#F4F7F5] border-t border-[#E0E7E3] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-semibold text-[#17211D] bg-white border border-[#E0E7E3] rounded hover:bg-gray-50 cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => handleSelectServiceForQuote(selectedService.title)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0B3B2E] hover:bg-[#145C45] rounded cursor-pointer"
              >
                Demander un devis pour ce service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          11. VIDEO MODAL (Live Official Video from G.E.H.S.)
          ========================================================================= */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#04251C]/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="bg-black rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0B3B2E] text-white px-4 py-3 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                <Play className="w-4 h-4 text-[#E7B83C] fill-[#E7B83C]" />
                Vidéo officielle G.E.H.S. — Interventions Terrain
              </span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-white hover:text-[#E7B83C] p-1 cursor-pointer"
                aria-label="Fermer la vidéo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src="/assets/aistudio/WhatsApp_Video_2026-10-14_at_10.30.02_AM_c22f22fe.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
            </div>
            <div className="p-3 bg-[#04251C] text-[11px] text-[#A6BDB4] flex items-center justify-between">
              <span>Équipes Pulsof &amp; Stils en intervention au Gabon</span>
              <a
                href="#contact"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-[#E7B83C] font-bold hover:underline"
              >
                Demander une intervention &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
