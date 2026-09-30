import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { VisionMission } from "@/components/VisionMission";
import { AppHeader } from "@/components/AppHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — منصة مدرسة سبح المعاشي" },
      { name: "description", content: "سجّلي الدخول للوصول إلى ملفاتك الخاصة على منصة خزانة." },
      { property: "og:title", content: "تسجيل الدخول — منصة مدرسة سبح المعاشي" },
      {
        property: "og:description",
        content: "سجّلي الدخول للوصول إلى ملفاتك الخاصة على منصة خزانة.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session) void navigate({ to: "/" });
  }, [loading, session, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      if (mode === "up") {
        if (fullName.trim().length < 2) {
          toast.error("اكتبي اسمك الكامل.");
          return;
        }
        if (password.length < 6) {
          toast.error("كلمة المرور يجب ألا تقل عن ٦ أحرف.");
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName.trim() },
          },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("تم إنشاء الحساب. افتحي بريدك لتأكيد التسجيل.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر إتمام العملية.");
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "w-full bg-card border border-border rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-amber";

  return (
    <div className="min-h-screen">
      <AppHeader />
      <section className="mx-auto max-w-[1200px] px-5 pt-14 pb-4 text-center rise">
        <h1 className="font-display font-black text-5xl sm:text-6xl tracking-tight">
          كل عمل... له أثر
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-loose">
          منصة مدرسية توثّق أعمالك، وتنظم إنجازاتك،
          <br />
          وتجمع جهودك في مكان واحد.
        </p>
      </section>
      <VisionMission />
      <main className="mx-auto max-w-[520px] px-5 py-12">
        <h2 className="font-display font-black text-3xl tracking-tight mb-2">
          {mode === "in" ? "أهلًا بعودتك" : "إنشاء حساب معلمة"}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          ملفاتك خاصة بك وحدك — لا تراها أي معلمة أخرى.
        </p>

        <form onSubmit={submit} className="card-ink pop-amber p-5 space-y-3">
          {mode === "up" ? (
            <>
              <label className="block text-xs font-bold">الاسم الكامل</label>
              <input
                className={inputClass}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={80}
                placeholder="أ. سارة"
              />
            </>
          ) : null}

          <label className="block text-xs font-bold">البريد الإلكتروني</label>
          <input
            className={inputClass}
            type="email"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teacher@school.com"
          />

          <label className="block text-xs font-bold">كلمة المرور</label>
          <input
            className={inputClass}
            type="password"
            required
            maxLength={72}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-ink text-paper rounded-full px-6 py-3 font-bold border border-border pop-amber transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? "لحظة..." : mode === "in" ? "دخول" : "إنشاء الحساب"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="mt-4 text-sm font-bold underline underline-offset-4"
        >
          {mode === "in" ? "ليس لديك حساب؟ أنشئي حسابًا" : "لديك حساب؟ سجّلي الدخول"}
        </button>
      </main>
      <SiteFooter />
    </div>
  );
}
