import { Button } from "@/components/ui/button";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Check, Mountain, Zap, Droplets, Users, Shield, Award, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";

const destinations = [
  {
    id: 1,
    name: "JALAPÃO",
    description:
      "O Jalapão é um território mágico de águas cristalinas, dunas douradas e fervedouros de intensidade única. Aqui você encontra paisagens dramáticas, trilhas técnicas e noites de céu estrelado em um ambiente completamente selvagem.",
    highlights: [
      "Fervedouros com água que não afunda",
      "Dunas do Jalapão e pôr do sol inesquecível",
      "Cachoeiras como o Encontro das Águas",
      "Campings confortáveis em meio à natureza",
    ],
    image: "/Galeria/img14.jpeg",
    videoUrl: "https://www.youtube.com/embed/rh7La3DV1iI",
    galleryImages: [
      { src: "/Galeria/img01.jpeg", alt: "Trilha no Jalapão" },
      { src: "/Galeria/img05.jpeg", alt: "Fervedouro do Jalapão" },
      { src: "/Galeria/img14.jpeg", alt: "Areia e dunas" },
      { src: "/Galeria/img20.jpeg", alt: "Passeio no cerrado" },
      { src: "/Galeria/img21.jpeg", alt: "Pôr do sol no Jalapão" },
    ],
    features: [
      { icon: Droplets, label: "Fervedouros naturais" },
      { icon: Mountain, label: "Trilhas e mirantes" },
      { icon: Zap, label: "Aventura e emoção" },
      { icon: Users, label: "Guias experientes" },
      { icon: Shield, label: "Segurança total" },
      { icon: Award, label: "Experiência autêntica" },
    ],
  },
  {
    id: 2,
    name: "SERRAS GERAIS",
    description:
      "As Serras Gerais oferecem um cenário de serras, vales e cachoeiras preservadas. É uma expedição que combina história natural, tranquilidade e a sensação de estar em um dos últimos lugares quase intocados do Cerrado.",
    highlights: [
      "Caminhadas por trilhas exclusivas",
      "Banhos em cachoeiras cristalinas",
      "Observação da fauna e flora do Cerrado",
      "Vivência com comunidades locais",
    ],
    image: "/Galeria/img57.jpeg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    galleryImages: [
      { src: "/Galeria/img21.jpeg", alt: "Serra e cachoeira" },
      { src: "/Galeria/img22.jpeg", alt: "Trilha nas Serras Gerais" },
      { src: "/Galeria/img23.jpeg", alt: "Natureza serrana" },
      { src: "/Galeria/img56.jpeg", alt: "Cachoeira cristalina" },
      { src: "/Galeria/img57.jpeg", alt: "Vale das Serras Gerais" },
    ],
    features: [
      { icon: Droplets, label: "Cachoeiras escondidas" },
      { icon: Mountain, label: "Paisagens serranas" },
      { icon: Zap, label: "Experiência imersiva" },
      { icon: Users, label: "Apoio de guias locais" },
      { icon: Shield, label: "Roteiro planejado" },
      { icon: Award, label: "Conexão com cultura regional" },
    ],
  },
];

export default function Detalhes() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/detalhes/:id");
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const destinationId = match ? Number(params.id) : NaN;
  const destination = destinations.find((item) => item.id === destinationId);

  useEffect(() => {
    if (!carouselApi) return;

    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 2500);

    return () => window.clearInterval(interval);
  }, [carouselApi]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container text-center py-24">
          <h1 className="text-4xl font-bold mb-6">Destino não encontrado</h1>
          <p className="text-foreground/70 mb-8">
            Parece que este detalhe não está disponível no momento.
          </p>
          <Button onClick={() => navigate('/home')} className="bg-primary text-primary-foreground">
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <Link href="/home" className="inline-flex items-center">
            <img src="/Galeria/logo.raiz.png" alt="Raiz Viva Expedições" className="h-12 w-auto" />
          </Link>
          <button
            type="button"
            onClick={() => navigate('-1')}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <ArrowLeft className="w-4 h-4 inline-block mr-2" />
            Voltar
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {destinations.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(`/detalhes/${item.id}`)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                item.id === destination.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-100 text-foreground hover:bg-slate-200"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <section className="py-10 md:py-16 bg-black/5">
        <div className="container">
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={destination?.videoUrl}
                title={`Vídeo ${destination?.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white/80">
        <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{destination.name}</h1>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              {destination.description}
            </p>

            <div className="grid gap-4 mb-10">
              {destination.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <p className="text-foreground/80">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destination.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl shadow-slate-200">
            <Carousel setApi={setCarouselApi} opts={{ loop: true, align: "start" }}>
              <CarouselContent className="h-[420px]">
                {destination.galleryImages?.map((image) => (
                  <CarouselItem key={image.src} className="h-[420px]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Roteiro Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-amber-50 to-white">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Roteiro de Viagem
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl">
              Veja abaixo o que está incluso no roteiro e como a viagem é planejada para você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
                <h3 className="text-2xl font-semibold text-green-700 font-display">
                  INCLUÍDO
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Ingressos dos atrativos</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Transporte</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Serviço pré-viagem</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Hospedagem</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Refeições: café da manhã, almoço e jantar</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Auxílio nas fotografias</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Imagens de drone</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Seguro viagem</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <X className="w-8 h-8 text-red-600" strokeWidth={3} />
                <h3 className="text-2xl font-semibold text-red-700 font-display">
                  NÃO INCLUÍDO
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-red-100 hover:shadow-md transition-all">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Passagens aéreas</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-red-100 hover:shadow-md transition-all">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Despesas pessoais</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-red-100 hover:shadow-md transition-all">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Bebidas alcoólicas</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-red-100 hover:shadow-md transition-all">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" strokeWidth={3} />
                  <p className="text-foreground font-medium font-display">Hospedagem pré e pós-retiro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
