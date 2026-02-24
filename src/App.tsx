/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ArrowRight, 
  User, 
  Scissors, 
  ShoppingBag, 
  Calendar, 
  CheckCircle2, 
  MessageCircle,
  RotateCcw,
  Home,
  Users,
  UserCircle
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface TriageData {
  name: string;
  hairLength: string;
  materialChoice: string;
  braidName: string;
  date: string;
  time: string;
  observations: string;
}

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<TriageData>({
    name: '',
    hairLength: 'Curto',
    materialChoice: 'Já tenho o material',
    braidName: '',
    date: '',
    time: '',
    observations: '',
  });

  const nextStep = () => setStep((prev) => (prev < 6 ? (prev + 1) as Step : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));
  const reset = () => {
    setStep(1);
    setData({
      name: '',
      hairLength: 'Curto',
      materialChoice: 'Já tenho o material',
      braidName: '',
      date: '',
      time: '',
      observations: '',
    });
  };

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de agendar um atendimento.\n\n*Resumo da Triagem:*\n- Nome: ${data.name}\n- Comprimento: ${data.hairLength}\n- Material: ${data.materialChoice}\n- Trança: ${data.braidName}\n- Data: ${data.date}\n- Horário: ${data.time}\n- Observações: ${data.observations}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-[#f6f6f8] text-slate-900 font-sans flex flex-col items-center">
      <div className="w-full max-w-md bg-white shadow-sm sticky top-0 z-10">
        {step < 6 && (
          <>
            <div className="flex items-center justify-between px-4 py-4">
              <button 
                onClick={prevStep}
                disabled={step === 1}
                className={`p-2 rounded-full transition-colors ${step === 1 ? 'opacity-0' : 'hover:bg-slate-100'}`}
              >
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              <span className="text-sm font-semibold text-slate-500">Etapa {step} de 5</span>
              <div className="w-10"></div>
            </div>
            <div className="w-full h-1 bg-slate-100">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </>
        )}
      </div>

      <main className="w-full max-w-md px-6 flex flex-col flex-1 py-8 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center"
            >
              <div className="w-full bg-white rounded-2xl shadow-xl shadow-indigo-500/5 p-8 flex flex-col items-center border border-slate-100">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                  <User className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">Quem é você?</h1>
                  <p className="text-slate-500 font-medium">Como podemos te chamar?</p>
                </div>
                <div className="w-full space-y-4">
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-xl focus:border-indigo-600 focus:bg-white transition-all outline-none text-slate-900 text-lg font-medium"
                  />
                  <button
                    onClick={nextStep}
                    disabled={!data.name}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/20 mt-4"
                  >
                    <span>Próximo</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="mt-8 text-center text-slate-400 text-sm leading-relaxed px-4">
                Ao continuar, você inicia sua triagem personalizada para um atendimento exclusivo.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-indigo-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Seu cabelo</h1>
              </div>
              <p className="text-slate-500 text-sm">Qual o comprimento atual do seu cabelo natural?</p>
              
              <div className="space-y-4">
                {[
                  { label: 'Curto', sub: 'Altura da Nuca' },
                  { label: 'Médio', sub: 'Altura do Ombro' },
                  { label: 'Longo', sub: 'Abaixo das Costas' }
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setData({ ...data, hairLength: option.label })}
                    className={`w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all ${
                      data.hairLength === option.label 
                      ? 'border-indigo-600 bg-indigo-50/50' 
                      : 'border-slate-200 bg-white hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-bold text-slate-900 leading-tight">{option.label}</span>
                      <span className="text-sm text-slate-500 font-medium">{option.sub}</span>
                    </div>
                    {data.hairLength === option.label && (
                      <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button onClick={prevStep} className="px-6 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors">
                  Voltar
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Material</h1>
              </div>
              <p className="text-slate-500 text-sm">Como será o material para o procedimento?</p>

              <div className="space-y-4">
                {[
                  { label: 'Já tenho o material', sub: 'Vou levar no dia do atendimento' },
                  { label: 'Você fornece o material', sub: 'Incluir o valor no meu orçamento' }
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setData({ ...data, materialChoice: option.label })}
                    className={`w-full flex items-center justify-between p-6 rounded-xl border-2 transition-all ${
                      data.materialChoice === option.label 
                      ? 'border-emerald-500 bg-emerald-50/50' 
                      : 'border-slate-200 bg-white hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-bold text-slate-900">{option.label}</span>
                      <span className="text-sm text-slate-500">{option.sub}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      data.materialChoice === option.label ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                    }`}>
                      {data.materialChoice === option.label && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold mt-0.5">i</div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Certifique-se de que o material (cabelo sintético) seja do tipo recomendado para o modelo escolhido.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button onClick={prevStep} className="flex-1 h-14 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                  Voltar
                </button>
                <button
                  onClick={nextStep}
                  className="flex-[2] h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
                >
                  Próximo
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center"
            >
              <div className="w-full bg-white rounded-2xl shadow-xl shadow-indigo-500/5 p-8 flex flex-col items-center border border-slate-100">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                  <Scissors className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">Qual o nome da trança?</h1>
                  <p className="text-slate-500 font-medium">Qual modelo você deseja fazer?</p>
                </div>
                <div className="w-full space-y-4">
                  <input
                    type="text"
                    value={data.braidName}
                    onChange={(e) => setData({ ...data, braidName: e.target.value })}
                    placeholder="Ex: Box Braids, Nagô, etc."
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-xl focus:border-indigo-600 focus:bg-white transition-all outline-none text-slate-900 text-lg font-medium"
                  />
                  <div className="flex items-center gap-4 mt-4">
                    <button onClick={prevStep} className="px-6 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors">
                      Voltar
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!data.braidName}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/20"
                    >
                      <span>Próximo</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Data e Notas</h1>
              </div>
              <h2 className="text-2xl font-bold">Quase lá!</h2>
              <p className="text-slate-600 leading-relaxed">
                Escolha sua data e horário preferidos e adicione qualquer detalhe importante para o seu atendimento.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Pretensão de Data</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={data.date}
                        onChange={(e) => setData({ ...data, date: e.target.value })}
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Horário</label>
                    <div className="relative">
                      <input
                        type="time"
                        value={data.time}
                        onChange={(e) => setData({ ...data, time: e.target.value })}
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Observações</label>
                  <textarea
                    value={data.observations}
                    onChange={(e) => setData({ ...data, observations: e.target.value })}
                    placeholder="Ex: Cor do jumbo, modelo específico, acessórios ou se possui alguma sensibilidade no couro cabeludo..."
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold mt-0.5">i</div>
                <p className="text-xs text-slate-600 leading-normal">
                  Lembre-se: a data e horário selecionados estão sujeitos a confirmação de disponibilidade na agenda da profissional.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button onClick={prevStep} className="flex-1 h-14 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                  Voltar
                </button>
                <button
                  onClick={nextStep}
                  className="flex-[2] h-14 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Finalizar Triagem
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="mb-6 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full"></div>
                  <div className="relative bg-emerald-500 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                </div>
                <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 text-center">
                  Resumo Pronto!
                </h2>
                <p className="mt-1 text-slate-600 text-center text-sm max-w-[280px]">
                  Confira os detalhes da sua triagem antes de nos chamar.
                </p>
              </div>

              <div className="w-full max-w-sm bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm mb-8">
                <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-800">Resumo da Triagem</h3>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Nome do Cliente</span>
                      <span className="text-slate-900 font-semibold">{data.name}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Trança</span>
                      <span className="text-slate-900 font-semibold">{data.braidName}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Comprimento</span>
                      <span className="text-slate-900 font-semibold">{data.hairLength}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Material</span>
                      <span className="text-slate-900 font-semibold">{data.materialChoice}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 pt-3 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Previsão de Data e Hora</span>
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span>{data.date || 'Não informada'} às {data.time || '--:--'}</span>
                    </div>
                  </div>
                  {data.observations && (
                    <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Observações</span>
                      <p className="text-sm text-slate-700 leading-relaxed italic">
                        "{data.observations}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full max-w-sm space-y-4">
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#22bf5c] text-white font-extrabold text-lg py-5 px-8 rounded-full shadow-xl shadow-[#25D366]/20 transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-6 h-6" />
                  Chamar no WhatsApp
                </button>
                <button
                  onClick={reset}
                  className="w-full text-slate-500 font-semibold text-sm py-2 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Refazer Triagem
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <div className="w-32 h-1 bg-slate-200 rounded-full mb-2 mt-auto"></div>
    </div>
  );
}
