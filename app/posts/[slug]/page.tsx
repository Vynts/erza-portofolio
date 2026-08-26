import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSortedPostsData } from '@/lib/posts';

interface PostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

marked.setOptions({
  gfm: true,
  breaks: true,
});

function getPostContent(slug: string) {
  const folder = path.join(process.cwd(), 'content/posts');
  const file = path.join(folder, `${slug}.md`);

  if (!fs.existsSync(file)) {
    return null;
  }

  const fileContent = fs.readFileSync(file, 'utf8');
  const matterResult = matter(fileContent);
  const htmlContent = marked.parse(matterResult.content);

  return {
    meta: matterResult.data,
    html: htmlContent,
  };
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostContent(resolvedParams.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.meta.title} | Alvinza Erza`,
    description: post.meta.description || 'Artikel seputar backend development dan teknologi.',
  };
}

export default async function PostDetailPage({ params }: PostProps) {
  const resolvedParams = await params;
  const post = getPostContent(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-[#0d1117]/70 text-[#c9d1d9] py-8 sm:py-16 px-4 sm:px-6 selection:bg-[#38bdf8]/30 selection:text-white">
      {/* Diperlebar dari max-w-3xl menjadi max-w-4xl agar membaca lebih lega */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Button */}
        <Link 
          href="/posts" 
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161b22] border border-[#30363d] text-xs font-mono text-[#8b949e] hover:text-[#38bdf8] hover:border-[#424750] transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
          <span>Kembali ke Posts</span>
        </Link>

        {/* Main Article Container */}
        <article className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-12 space-y-8 overflow-hidden shadow-xl">
          
          {/* Header Section */}
          <div className="space-y-4 pb-6 border-b border-[#30363d]/60">
            {/* Meta Info: Date & Tags */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#8b949e] font-mono">
                {post.meta.date ? new Date(post.meta.date).toLocaleDateString('id-ID', {
                  day: 'numeric', month: 'long', year: 'numeric'
                }) : ''}
              </span>

              {post.meta.tags && Array.isArray(post.meta.tags) && (
                <div className="flex flex-wrap gap-1.5">
                  {post.meta.tags.map((tag: string) => (
                    <span 
                      key={tag} 
                      className="font-mono text-[11px] text-[#38bdf8] bg-[#21262d] border border-[#30363d] px-2.5 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {post.meta.title}
            </h1>

            {/* Description */}
            {post.meta.description && (
              <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed text-left">
                {post.meta.description}
              </p>
            )}
          </div>

          {/* Markdown Body Content */}
          <div 
            className="prose prose-invert max-w-none text-[#c9d1d9] break-words
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              [&_p]:my-5 [&_p]:leading-relaxed [&_p]:text-sm sm:[&_p]:text-base [&_p]:text-[#c9d1d9]/90
              [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-white [&_h2]:border-b [&_h2]:border-[#30363d]/40 [&_h2]:pb-2
              [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[#f0f6fc]
              prose-a:text-[#38bdf8] prose-a:no-underline hover:prose-a:underline
              prose-code:text-[#38bdf8] prose-code:bg-[#21262d] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-[#30363d] prose-pre:p-5 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:text-xs sm:prose-pre:text-sm
              prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-4 prose-ol:space-y-2
              prose-ul:list-disc prose-ul:pl-5 prose-ul:my-4 prose-ul:space-y-2
              prose-blockquote:border-l-4 prose-blockquote:border-[#38bdf8] prose-blockquote:bg-[#21262d]/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6 prose-blockquote:text-[#8b949e] prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </div>
  );
}