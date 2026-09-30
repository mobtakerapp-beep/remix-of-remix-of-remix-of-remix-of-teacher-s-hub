import { EXT_COLOR, EXT_SHADOW, formatSize } from "@/lib/constants";

export type FileRow = {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  file_path: string | null;
  file_ext: string | null;
  file_size: number | null;
  video_url: string | null;
};

export function FileCard({
  file,
  onOpen,
  onDelete,
}: {
  file: FileRow;
  onOpen: (file: FileRow) => void;
  onDelete?: (file: FileRow) => void;
}) {
  const ext = (file.file_ext ?? "link").toLowerCase();
  const badge = EXT_COLOR[ext] ?? "bg-ink";
  const shadow = EXT_SHADOW[ext] ?? "pop-ink";

  return (
    <article
      className={`card-ink p-4 ${shadow} transition-transform duration-200 hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[10px] font-bold text-paper ${badge} rounded-md px-2 py-0.5 border-2 border-ink`}
        >
          {file.video_url && !file.file_path ? "رابط" : ext.toUpperCase()}
        </span>
        <span className="text-[11px] text-muted-foreground">{formatSize(file.file_size)}</span>
      </div>
      <h3 className="font-display font-bold text-lg leading-snug text-balance mb-2">{file.title}</h3>
      {file.description ? (
        <p className="text-xs text-muted-foreground leading-relaxed text-pretty mb-4">
          {file.description}
        </p>
      ) : null}
      <div className="flex items-center gap-2 text-[11px] flex-wrap">
        {file.subject ? (
          <span className="bg-ink text-paper rounded-full px-2 py-0.5 font-semibold">
            {file.subject}
          </span>
        ) : null}
        {file.grade ? (
          <span className="bg-foreground/8 rounded-full px-2 py-0.5 font-semibold">{file.grade}</span>
        ) : null}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => onOpen(file)}
          className="text-xs font-bold border-2 border-ink rounded-full px-3 py-1.5 bg-card hover:-translate-y-0.5 transition-transform"
        >
          {file.file_path ? "فتح الملف" : "فتح الرابط"}
        </button>
        {onDelete ? (
          <button
            onClick={() => onDelete(file)}
            className="text-xs font-bold border-2 border-ink rounded-full px-3 py-1.5 text-coral bg-card hover:-translate-y-0.5 transition-transform"
          >
            حذف
          </button>
        ) : null}
      </div>
    </article>
  );
}
