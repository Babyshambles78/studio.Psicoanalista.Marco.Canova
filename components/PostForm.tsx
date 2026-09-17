import { SubmitButton } from "@/components/SubmitButton";
import { savePost } from "@/lib/actions/posts";

type PostValues = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  published?: boolean;
};

export function PostForm({ post }: { post?: PostValues }) {
  return (
    <form action={savePost} className="space-y-5 rounded-2xl border border-line bg-white px-6 py-8">
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
      <Field name="title" label="Titolo" defaultValue={post?.title} required />
      <Field name="slug" label="Slug (facoltativo)" defaultValue={post?.slug} />
      <div>
        <label className="mb-2 block text-sm text-muted" htmlFor="excerpt">
          Estratto
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={post?.excerpt}
          className="w-full rounded-xl border border-line bg-paper px-3 py-3"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted" htmlFor="content">
          Testo
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={post?.content}
          className="w-full rounded-xl border border-line bg-paper px-3 py-3"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="published" defaultChecked={post?.published} />
        Pubblicato
      </label>
      <SubmitButton className="rounded-full bg-sage px-6 py-3 text-sm text-white hover:bg-sage-dark">
        Salva
      </SubmitButton>
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-line bg-paper px-3 py-3"
      />
    </div>
  );
}
