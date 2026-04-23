'use client';
import { useEffect, useState } from 'react';
import {  Building2, Clock, Globe } from 'lucide-react';

type Company = {
    id: number;
    name: string;
    logo: string | null;
    role: string | null;
    duration: string | null;
    website: string | null;
    projects: string[];
    technologies: string[];
};

const CompaniesSection = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch('/api/companies');
                const data = (await res.json()) as Company[];
                const list = Array.isArray(data) ? data : [];
                if (cancelled) return;
                setCompanies(list);
                setSelectedCompany(list[0] ?? null);
            } catch {
                if (!cancelled) {
                    setCompanies([]);
                    setSelectedCompany(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <section id="experience" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                            Companies I&apos;ve Worked With
                        </span>
                    </h2>
                    <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                        I&apos; ve collaborated with amazing teams to build impactful products.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Company List */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="glass-card p-6 rounded-2xl text-sm text-foreground/70">
                                Loading companies...
                            </div>
                        ) : null}
                        {companies.map((company) => (
                            <button
                                key={company.id ?? company.name}
                                onClick={() => setSelectedCompany(company)}
                                className={`w-full text-left p-6 rounded-2xl hover:scale-105  transition-all duration-300 ${selectedCompany?.name === company.name ? 'glass-card border border-primary/30' : 'glass hover:bg-background/20'}`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                                        {/* Replace with actual logo */}
                                        {company.logo ? (
                                            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                                        ) : (
                                            <Building2 className="w-8 h-8 text-primary" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{company.name}</h3>
                                        <p className="text-foreground/60 text-sm">{company.role}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Company Details */}
                    <div className="lg:col-span-2">
                        <div className="glass-card p-6 rounded-2xl h-full">
                            {!selectedCompany ? (
                                <div className="text-sm text-foreground/70">
                                    {loading ? "Loading..." : "No companies found."}
                                </div>
                            ) : (
                                <>
                                    {/* Company header remains the same */}
                                    <div className="flex glass-card p-5 rounded-lg items-start gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-lg bg-white p-2 flex items-center justify-center shrink-0">
                                            <img src={selectedCompany.logo ?? ""} alt={selectedCompany.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold">{selectedCompany.name}</h3>
                                            <p className="text-primary font-medium text-sm">{selectedCompany.role}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="flex items-center text-xs text-foreground/60">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {selectedCompany.duration}
                                                </span>
                                                {selectedCompany.website ? (
                                                    <a
                                                        href={selectedCompany.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-xs text-primary hover:underline"
                                                    >
                                                        <Globe className="w-3 h-3 mr-1" />
                                                        Website
                                                    </a>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* New two-column layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Projects Column */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Projects & Contributions</h4>
                                            <ul className="space-y-1.5">
                                                {selectedCompany.projects?.map((project, index) => (
                                                    <li key={index} className="flex items-start text-sm">
                                                        <span className="text-primary mr-1.5 mt-0.5">▹</span>
                                                        <span>{project}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Technologies Column */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Technologies Used</h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {selectedCompany.technologies?.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-0.5 glass rounded-full text-xs font-mono"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Trusted By Section */}
                <div className="mt-20">
                    <h3 className="text-center text-xl text-foreground/60 mb-8">Trusted by innovative companies</h3>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                        {companies.map((company) => (
                            <div
                                key={`logo-${company.id ?? company.name}`}
                                className="w-24 h-24 bg-white p-4 rounded-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                            >
                                {/* <Building2 className="w-10 h-10 text-gray-800" /> */}
                                {company.website ? (
                                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                                        <img src={company.logo ?? ""} alt={company.name} className="w-full h-full object-contain" />
                                    </a>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img src={company.logo ?? ""} alt={company.name} className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* <div className="w-24 h-24 bg-white p-4 rounded-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
              <Building2 className="w-10 h-10 text-gray-800" />
            </div>
            <div className="w-24 h-24 bg-white p-4 rounded-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
              <Building2 className="w-10 h-10 text-gray-800" />
            </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompaniesSection;