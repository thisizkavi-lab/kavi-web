
export interface Frontmatter {
    [key: string]: any;
}

export interface MarkdownFile {
    filename: string;
    frontmatter: Frontmatter;
    content: string;
}

// Simple frontmatter parser to avoid node Buffer polyfills
const parseFrontmatter = (fileContent: string): { frontmatter: Frontmatter; content: string } => {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);

    if (!match) {
        return { frontmatter: {}, content: fileContent };
    }

    const frontmatterBlock = match[1];
    const content = fileContent.replace(frontmatterRegex, '').trim();

    const frontmatter: Frontmatter = {};
    frontmatterBlock.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();

            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            // Parse arrays (simple comma separated)
            if (value.startsWith('[') && value.endsWith(']')) {
                const listVal = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
                frontmatter[key] = listVal;
            } else if (!isNaN(Number(value))) {
                // Parse simple numbers
                frontmatter[key] = Number(value);
            } else {
                frontmatter[key] = value;
            }
        } else if (line.trim().startsWith('-')) {
            // Handle list items for metrics (specifically for projects)
            // This is a simple hack for the specific metrics structure
            // Ideally we'd use a real YAML parser if structure gets too complex, 
            // but for this user's use case, this lightweight version is safer for browser.
        }
    });

    // Special handling for metrics manually since the loop above is too simple
    if (frontmatterBlock.includes('metrics:')) {
        const metrics: any[] = [];
        const lines = frontmatterBlock.split('\n');
        let inMetrics = false;
        let currentMetric: any = {};

        for (const line of lines) {
            if (line.trim().startsWith('metrics:')) {
                inMetrics = true;
                continue;
            }
            if (inMetrics) {
                if (line.trim().startsWith('- label:')) {
                    if (Object.keys(currentMetric).length > 0) metrics.push(currentMetric);
                    currentMetric = {};
                    currentMetric.label = line.split('label:')[1].trim().replace(/['"]/g, '');
                } else if (line.trim().startsWith('value:')) {
                    currentMetric.value = Number(line.split('value:')[1].trim());
                } else if (line.trim() === '' || (!line.startsWith(' ') && !line.startsWith('-'))) {
                    if (Object.keys(currentMetric).length > 0) metrics.push(currentMetric);
                    inMetrics = false;
                }
            }
        }
        if (Object.keys(currentMetric).length > 0) metrics.push(currentMetric);
        frontmatter['metrics'] = metrics;
    }

    return { frontmatter, content };
};

export const getBlogs = async (): Promise<MarkdownFile[]> => {
    const modules = import.meta.glob('/content/blogs/*.md', { query: '?raw', import: 'default' });
    const posts: MarkdownFile[] = [];

    for (const path in modules) {
        const rawContent = await modules[path]() as string;
        const { frontmatter, content } = parseFrontmatter(rawContent);
        const filename = path.split('/').pop()?.replace('.md', '') || '';

        posts.push({
            filename,
            frontmatter,
            content
        });
    }

    // Sort by date desc
    return posts.sort((a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
};

export const getProjects = async (): Promise<MarkdownFile[]> => {
    const modules = import.meta.glob('/content/projects/*.md', { query: '?raw', import: 'default' });
    const projects: MarkdownFile[] = [];

    for (const path in modules) {
        const rawContent = await modules[path]() as string;
        const { frontmatter, content } = parseFrontmatter(rawContent);
        const filename = path.split('/').pop()?.replace('.md', '') || '';

        projects.push({
            filename,
            frontmatter,
            content
        });
    }

    return projects;
};
