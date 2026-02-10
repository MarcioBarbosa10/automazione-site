"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function Home() {
  // =========================
  // CONFIG RÁPIDA (EDITE AQUI)
  // =========================
  const phoneE164 = "5511995081808"; // WhatsApp (DDI+DDD+numero)
  const empresa = "Automazione Soluções";
  const regiao = "SP Capital — Zona Sul";
  const linkLivro = "https://clubedeautores.com.br/livro/automacao-e-para-todos";

  // Dica do dia (edite quando quiser)
  const dicaDoDia = {
    titulo: "Dica do dia: Wi-Fi que não cai em sobrado",
    texto:
      "Se o mesh estiver com nodes longe demais, vira repetidor ruim. Regra prática: cada node precisa enxergar o anterior com sinal forte. Se der, use cabo (backhaul) no ponto crítico e deixe o Wi-Fi só para o último trecho.",
  };

  // =========================
  // ESTADOS
  // =========================
  const tipos = ["Apartamento", "Casa", "Escritório", "Loja"] as const;
  const [tipoImovel, setTipoImovel] = useState<(typeof tipos)[number]>("Apartamento");

  const [menuOpen, setMenuOpen] = useState(false);

  // Form contato
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [contato, setContato] = useState("");
  const [objetivo, setObjetivo] = useState("");

  // Projetos: filtro por categoria
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Todos");

  // FAQ: acordeão
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  // =========================
  // CONTEÚDO
  // =========================
  const servicos = [
    { title: "Wi-Fi Mesh em sobrado", desc: "Cobertura total + estabilidade para streaming e home office." },
    { title: "Cortinas motorizadas", desc: "Automação por horário, voz e cenas (Acordar / Cinema)." },
    { title: "Iluminação dimerizável", desc: "Dimmer, sensores e cenas com acabamento limpo." },
    { title: "Interruptores programáveis", desc: "Rotinas e controle inteligente sem complicação." },
    { title: "Câmeras de segurança", desc: "Monitoramento, alertas e gravação conforme necessidade." },
    { title: "LED RGB + intensidade", desc: "Cor, brilho e clima do ambiente em 1 toque." },
    { title: "Fechadura eletrônica", desc: "Acesso inteligente e registros com segurança." },
    { title: "Campainha Doorbell", desc: "Notificações e vídeo na palma da mão." },
  ];

  /**
   * Projetos com vídeo via YouTube:
   * - Preencha youtubeId depois (somente o ID, não o link inteiro)
   * - Ex.: https://www.youtube.com/watch?v=AbCdEfGhIjk -> youtubeId: "AbCdEfGhIjk"
   */
  const projetos = [
    {
      titulo: "Wi-Fi Mesh em sobrado",
      detalhe: "Cobertura total + estabilidade (sem travar).",
      categoria: "Rede/Wi-Fi",
      youtubeId: "",
      tags: ["Wi-Fi", "Mesh", "Backhaul"],
    },
    {
      titulo: "Cortinas motorizadas",
      detalhe: "Horário, voz e cenas (Acordar/Cinema).",
      categoria: "Conforto",
      youtubeId: "",
      tags: ["Cortinas", "Cenas", "Conforto"],
    },
    {
      titulo: "Iluminação dimerizável",
      detalhe: "Dimmer, sensores e cenas por ambiente.",
      categoria: "Iluminação",
      youtubeId: "",
      tags: ["Dimmer", "Cenas", "Sensor de presença"],
    },
    {
      titulo: "LED RGB + intensidade",
      detalhe: "Cor e brilho para clima do ambiente.",
      categoria: "Iluminação",
      youtubeId: "",
      tags: ["LED", "RGB", "Dimerização"],
    },
    {
      titulo: "Segurança (câmeras + sensores)",
      detalhe: "Proteção com alertas e automações.",
      categoria: "Segurança",
      youtubeId: "",
      tags: ["Câmeras", "Sensores", "Alertas"],
    },
    {
      titulo: "Fechadura + Doorbell",
      detalhe: "Acesso inteligente e notificações.",
      categoria: "Segurança",
      youtubeId: "",
      tags: ["Fechadura", "Doorbell", "Acesso"],
    },
  ];

  const comoFunciona = [
    { n: "1) Diagnóstico", d: "WhatsApp + perguntas certeiras. Se precisar, visita técnica objetiva." },
    { n: "2) Projeto", d: "Escopo claro: o que entra, por quê e quanto custa." },
    { n: "3) Instalação", d: "Organização, acabamento e testes. Sem gambiarra." },
    { n: "4) Entrega + suporte", d: "Checklist, orientação e pós-instalação." },
  ];

  const faqs = [
    { q: "Dá pra fazer em imóvel já pronto?", a: "Sim. Ajusto a solução ao seu cenário, com instalação limpa e sem quebradeira desnecessária." },
    { q: "Precisa trocar tudo?", a: "Não. Integro o que já existe e recomendo troca só onde faz diferença real (estabilidade/segurança)." },
    { q: "E se a internet cair?", a: "Dá pra planejar controle local em partes críticas e manter o essencial funcionando." },
    { q: "Tem garantia e suporte?", a: "Sim. Entrega com checklist, orientação e suporte pós-instalação." },
  ];

  const dicasRapidas = [
    { titulo: "Iluminação inteligente: 3 cenas que mudam a rotina", resumo: "Cheguei, Cinema e Boa Noite. Simples, útil e viciante." },
    { titulo: "Cortinas: o que vale automatizar primeiro", resumo: "Quarto e sala. Priorize conforto e repetição diária." },
    { titulo: "Segurança: o básico bem feito", resumo: "Sensor + câmera + iluminação automática. Menos é mais (quando bem feito)." },
  ];

  // =========================
  // UTIL
  // =========================
  const track = (label: string) => {
    // tracking simples (se quiser GA/Meta depois, plugamos aqui)
    // eslint-disable-next-line no-console
    console.log(`[lead] ${label}`);
  };

  const categoriasProjetos = useMemo(() => {
    const all = new Set<string>();
    projetos.forEach((p) => all.add(p.categoria));
    return ["Todos", ...Array.from(all)];
  }, [projetos]);

  const projetosFiltrados = useMemo(() => {
    if (categoriaAtiva === "Todos") return projetos;
    return projetos.filter((p) => p.categoria === categoriaAtiva);
  }, [projetos, categoriaAtiva]);

  // =========================
  // WHATSAPP (links prontos)
  // =========================
  const whatsappBriefing = useMemo(() => {
    const texto = encodeURIComponent(
      `Olá! Quero um orçamento de automação na Zona Sul de SP.\nTipo de imóvel: ${tipoImovel}.`
    );
    return `https://wa.me/${phoneE164}?text=${texto}`;
  }, [tipoImovel, phoneE164]);

  const whatsappContato = useMemo(() => {
    const linhas = [
      "Olá! Quero um orçamento de automação na Zona Sul de SP.",
      `Tipo de imóvel: ${tipoImovel}.`,
      nome ? `Nome: ${nome}` : null,
      bairro ? `Bairro: ${bairro}` : null,
      contato ? `Contato: ${contato}` : null,
      objetivo ? `Objetivo: ${objetivo}` : null,
    ].filter(Boolean);

    const texto = encodeURIComponent(linhas.join("\n"));
    return `https://wa.me/${phoneE164}?text=${texto}`;
  }, [tipoImovel, nome, bairro, contato, objetivo, phoneE164]);

  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      {/* Glow de fundo */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-200px] left-[-120px] h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[130px]" />
      </div>

      {/* WhatsApp flutuante */}
      <a
        href={whatsappContato}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("whatsapp_floating")}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur hover:bg-white/15"
        title="Falar no WhatsApp"
      >
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        WhatsApp
      </a>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070A12]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/10" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">{empresa}</div>
              <div className="text-xs text-white/60">{regiao}</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#servicos">Serviços</a>
            <a className="hover:text-white" href="#projetos">Projetos</a>
            <a className="hover:text-white" href="#sobre">Quem somos</a>
            <a className="hover:text-white" href="#dicas">Dicas</a>
            <a className="hover:text-white" href="#como-funciona">Como funciona</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
            <a className="hover:text-white" href="#contato">Contato</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              aria-label="Abrir menu"
            >
              {menuOpen ? "Fechar" : "Menu"}
            </button>

            <a
              href={whatsappBriefing}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_header")}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#070A12] hover:bg-white/90"
            >
              Orçamento no WhatsApp
            </a>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#070A12]/90 backdrop-blur md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="grid gap-2 text-sm text-white/80">
                {[
                  ["Serviços", "#servicos"],
                  ["Projetos", "#projetos"],
                  ["Quem somos", "#sobre"],
                  ["Dicas", "#dicas"],
                  ["Como funciona", "#como-funciona"],
                  ["FAQ", "#faq"],
                  ["Contato", "#contato"],
                ].map(([t, href]) => (
                  <a
                    key={t}
                    href={href}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO + BRIEFING */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Automação • Wi-Fi • Iluminação • Cortinas • Segurança
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Automação na Zona Sul de SP — prática, bonita e confiável.
            </h1>

            <p className="mt-4 max-w-xl text-base text-white/70">
              Você não quer um monte de app. Você quer a casa funcionando.
              Projeto sob medida, instalação limpa e suporte real.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#070A12] hover:bg-white/90" href="#contato">
                Solicitar orçamento (2 min)
              </a>
              <a className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10" href="#servicos">
                Ver serviços
              </a>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5">
              <div className="text-xs font-semibold text-cyan-300">DICA DO DIA</div>
              <div className="mt-2 text-lg font-semibold">{dicaDoDia.titulo}</div>
              <div className="mt-2 text-sm text-white/65">{dicaDoDia.texto}</div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_-40px_rgba(0,0,0,.8)]">
            <div className="rounded-3xl bg-[#0B1020]/70 p-6 ring-1 ring-white/10">
              <div className="text-base font-semibold">Briefing rápido</div>
              <div className="mt-1 text-sm text-white/65">
                Selecione o tipo de imóvel e clique no WhatsApp.
              </div>

              <div className="mt-5 grid gap-3">
                {tipos.map((x) => (
                  <label
                    key={x}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition
                      ${
                        tipoImovel === x
                          ? "bg-cyan-500/20 border-cyan-400/40 text-white"
                          : "bg-white/5 border-white/10 text-white/85 hover:bg-white/10"
                      }`}
                  >
                    <span className="text-sm">{x}</span>
                    <input
                      type="radio"
                      name="tipoImovel"
                      value={x}
                      checked={tipoImovel === x}
                      onChange={() => setTipoImovel(x)}
                      className="h-4 w-4 accent-cyan-300"
                    />
                  </label>
                ))}
              </div>

              <a
                href={whatsappBriefing}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("whatsapp_briefing")}
                className="mt-5 block rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-[#070A12] hover:bg-white/90"
              >
                Falar no WhatsApp agora
              </a>

              <div className="mt-3 text-xs text-white/55">
                Quanto mais claro o pedido, mais rápido vira orçamento.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Serviços</h2>
            <p className="mt-2 text-sm text-white/65">Direto ao ponto: o que você pode automatizar hoje.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {servicos.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5 hover:bg-white/10 transition"
            >
              <div className="text-lg font-semibold">{s.title}</div>
              <div className="mt-2 text-sm text-white/65">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Projetos</h2>
            <p className="mt-2 text-sm text-white/65">
              Exemplos de soluções. Vídeos entram por YouTube para manter o site leve.
            </p>
          </div>
          <a
            href="#contato"
            className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 md:inline-flex"
          >
            Quero um projeto assim
          </a>
        </div>

        {/* Filtro por categoria */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categoriasProjetos.map((c) => (
            <button
              key={c}
              onClick={() => setCategoriaAtiva(c)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition
                ${
                  categoriaAtiva === c
                    ? "border-cyan-400/40 bg-cyan-500/20 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {projetosFiltrados.map((p) => (
            <div
              key={p.titulo}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5 hover:bg-white/10 transition"
            >
              {/* Vídeo YouTube (placeholder se não tiver id) */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1020]/40">
                {p.youtubeId ? (
                  <iframe
                    className="aspect-video w-full"
                    src={`https://www.youtube.com/embed/${p.youtubeId}?rel=0`}
                    title={`Vídeo do projeto: ${p.titulo}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center p-6 text-center">
                    <div>
                      <div className="text-xs font-semibold text-white/75">VÍDEO DO PROJETO</div>
                      <div className="mt-2 text-xs text-white/50">Adicionar depois (YouTube ID)</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 text-sm font-semibold">{p.titulo}</div>
              <div className="mt-2 text-sm text-white/65">{p.detalhe}</div>

              <div className="mt-3 text-xs text-white/50">{p.categoria}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUEM SOMOS + LIVRO */}
      <section id="sobre" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5">
            <h2 className="text-2xl font-semibold tracking-tight">Quem somos</h2>
            <p className="mt-3 text-sm text-white/65">
              {empresa} atua em {regiao} com foco em automação prática: estabilidade de rede, acabamento e suporte.
              A meta é simples: sua casa funcionar sem você virar refém de app.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Projeto sob medida", "Nada de pacote genérico"],
                ["Instalação limpa", "Organização + testes"],
                ["Estabilidade primeiro", "Wi-Fi e infraestrutura"],
                ["Suporte pós", "Você não fica na mão"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-[#0B1020]/40 p-4">
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="mt-1 text-xs text-white/60">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Autor e livro
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight">Márcio Barbosa</h3>
            <p className="mt-3 text-sm text-white/65">
              Engenheiro de Controle e Automação e gestor de TI. Especialista em automação e infraestrutura,
              com foco em soluções confiáveis, bem acabadas e fáceis de usar.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Automação residencial", "Cenas, conforto e controle"],
                ["Redes e Wi-Fi", "Estabilidade e cobertura real"],
                ["Segurança", "Câmeras e sensores com lógica"],
                ["Suporte", "Pós-instalação de verdade"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-[#0B1020]/40 p-4">
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="mt-1 text-xs text-white/60">{d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0B1020]/40 p-4">
              <div className="text-sm font-semibold">Livro: “Automação é para Todos!”</div>

              <div className="mt-4 flex gap-4 items-start">
                <div className="shrink-0">
                  <Image
                    src="/livro.png"
                    alt="Capa do livro Automação é para Todos"
                    width={140}
                    height={190}
                    className="rounded-2xl border border-white/10"
                  />
                </div>

                <div>
                  <p className="text-sm text-white/65">
                    Um guia direto para transformar automação em algo simples, útil e seguro — do básico ao avançado.
                  </p>

                  <a
                    href={linkLivro}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track("livro_comprar")}
                    className="mt-4 inline-flex rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#070A12] hover:bg-white/90"
                  >
                    Comprar o livro
                  </a>

                  <div className="mt-2 text-xs text-white/45">
                    Clube de Autores
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DICAS */}
      <section id="dicas" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-semibold tracking-tight">Dicas rápidas</h2>
        <p className="mt-2 text-sm text-white/65">
          Conteúdo curto pra educar e atrair cliente.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {dicasRapidas.map((d) => (
            <div
              key={d.titulo}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5 hover:bg-white/10 transition"
            >
              <div className="text-sm font-semibold">{d.titulo}</div>
              <div className="mt-2 text-sm text-white/65">{d.resumo}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-semibold tracking-tight">Como funciona</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {comoFunciona.map((p) => (
            <div
              key={p.n}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5"
            >
              <div className="text-sm font-semibold">{p.n}</div>
              <div className="mt-2 text-sm text-white/65">{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-semibold tracking-tight">Perguntas rápidas</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => {
            const open = faqOpen === f.q;
            return (
              <button
                key={f.q}
                onClick={() => setFaqOpen((v) => (v === f.q ? null : f.q))}
                className="text-left rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5 hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm font-semibold">{f.q}</div>
                  <div className="text-xs text-white/60">{open ? "—" : "+"}</div>
                </div>
                {open && <div className="mt-3 text-sm text-white/65">{f.a}</div>}
              </button>
            );
          })}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Contato</h2>
            <p className="mt-2 text-sm text-white/65">
              Me diga seu bairro e o que você quer automatizar. Eu respondo com o caminho mais direto.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5">
              <div className="text-sm font-semibold">Atendimento</div>
              <div className="mt-2 text-sm text-white/65">{regiao}</div>

              <a
                href={whatsappContato}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("whatsapp_contato_card")}
                className="mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#070A12] hover:bg-white/90"
              >
                Chamar no WhatsApp
              </a>

              <div className="mt-3 text-xs text-white/55">
                Imóvel + objetivo = orçamento mais rápido.
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5">
            <div className="text-sm font-semibold text-white/85">Detalhes do pedido</div>

            <div className="mt-4 grid gap-3">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0B1020]/60 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-400/40"
                placeholder="Nome"
              />
              <input
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0B1020]/60 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-400/40"
                placeholder="Bairro (Zona Sul)"
              />
              <input
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0B1020]/60 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-400/40"
                placeholder="WhatsApp/E-mail"
              />
              <textarea
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-[#0B1020]/60 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-400/40"
                placeholder="O que você quer automatizar? (ex.: iluminação + cortinas + Wi-Fi)"
              />
            </div>

            <a
              href={whatsappContato}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_form_send")}
              className="mt-5 block rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-[#070A12] hover:bg-white/90"
            >
              Enviar e falar no WhatsApp
            </a>

            <div className="mt-3 text-xs text-white/55">
              A mensagem vai pronta para o WhatsApp.
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {empresa} — Zona Sul SP
        </div>
      </footer>
    </main>
  );
}
