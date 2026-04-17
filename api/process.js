// CSS to Tailwind Converter API
// Stateless serverless function - converts CSS to Tailwind classes

const cssToTailwindMap = {
    // Colors - Text
    'color: white': 'text-white',
    'color: black': 'text-black',
    'color: #3b82f6': 'text-blue-500',
    'color: #2563eb': 'text-blue-600',
    'color: #1d4ed8': 'text-blue-700',
    'color: #ef4444': 'text-red-500',
    'color: #dc2626': 'text-red-600',
    'color: #10b981': 'text-green-500',
    'color: #059669': 'text-green-600',
    'color: #f59e0b': 'text-amber-500',
    'color: #d97706': 'text-amber-600',
    'color: #8b5cf6': 'text-violet-500',
    'color: #7c3aed': 'text-violet-600',
    'color: #ec4899': 'text-pink-500',
    'color: #db2777': 'text-pink-600',
    'color: #6b7280': 'text-gray-500',
    'color: #4b5563': 'text-gray-600',
    'color: #374151': 'text-gray-700',
    'color: #1f2937': 'text-gray-800',
    // Backgrounds
    'background-color: #3b82f6': 'bg-blue-500',
    'background-color: #2563eb': 'bg-blue-600',
    'background-color: white': 'bg-white',
    'background-color: #1f2937': 'bg-gray-800',
    'background-color: #0d1117': 'bg-gray-900',
    'background-color: black': 'bg-black',
    'background-color: transparent': 'bg-transparent',
    // Spacing - Padding
    'padding: 0': 'p-0',
    'padding: 4px': 'p-1',
    'padding: 8px': 'p-2',
    'padding: 12px': 'p-3',
    'padding: 16px': 'p-4',
    'padding: 20px': 'p-5',
    'padding: 24px': 'p-6',
    'padding: 32px': 'p-8',
    'padding: 40px': 'p-10',
    'padding: 48px': 'p-12',
    'padding-top: 4px': 'pt-1',
    'padding-top: 8px': 'pt-2',
    'padding-top: 16px': 'pt-4',
    'padding-bottom: 4px': 'pb-1',
    'padding-bottom: 8px': 'pb-2',
    'padding-bottom: 16px': 'pb-4',
    'padding-left: 4px': 'pl-1',
    'padding-left: 8px': 'pl-2',
    'padding-left: 16px': 'pl-4',
    'padding-right: 4px': 'pr-1',
    'padding-right: 8px': 'pr-2',
    'padding-right: 16px': 'pr-4',
    'padding: 8px 16px': 'py-2 px-4',
    'padding: 12px 24px': 'py-3 px-6',
    'padding: 16px 32px': 'py-4 px-8',
    // Spacing - Margin
    'margin: 0': 'm-0',
    'margin: 4px': 'm-1',
    'margin: 8px': 'm-2',
    'margin: 16px': 'm-4',
    'margin: 24px': 'm-6',
    'margin-top: 4px': 'mt-1',
    'margin-top: 8px': 'mt-2',
    'margin-top: 16px': 'mt-4',
    'margin-bottom: 4px': 'mb-1',
    'margin-bottom: 8px': 'mb-2',
    'margin-bottom: 16px': 'mb-4',
    // Border radius
    'border-radius: 0': 'rounded-none',
    'border-radius: 2px': 'rounded-sm',
    'border-radius: 4px': 'rounded',
    'border-radius: 6px': 'rounded-md',
    'border-radius: 8px': 'rounded-lg',
    'border-radius: 12px': 'rounded-xl',
    'border-radius: 16px': 'rounded-2xl',
    'border-radius: 24px': 'rounded-3xl',
    'border-radius: 9999px': 'rounded-full',
    // Font
    'font-weight: 300': 'font-light',
    'font-weight: 400': 'font-normal',
    'font-weight: 500': 'font-medium',
    'font-weight: 600': 'font-semibold',
    'font-weight: 700': 'font-bold',
    'font-weight: 800': 'font-extrabold',
    'font-size: 12px': 'text-xs',
    'font-size: 14px': 'text-sm',
    'font-size: 16px': 'text-base',
    'font-size: 18px': 'text-lg',
    'font-size: 20px': 'text-xl',
    'font-size: 24px': 'text-2xl',
    'font-size: 30px': 'text-3xl',
    // Display & Positioning
    'display: flex': 'flex',
    'display: block': 'block',
    'display: inline': 'inline',
    'display: inline-block': 'inline-block',
    'display: none': 'hidden',
    'position: relative': 'relative',
    'position: absolute': 'absolute',
    'position: fixed': 'fixed',
    // Flex
    'justify-content: center': 'justify-center',
    'justify-content: flex-start': 'justify-start',
    'justify-content: flex-end': 'justify-end',
    'justify-content: space-between': 'justify-between',
    'align-items: center': 'items-center',
    'align-items: flex-start': 'items-start',
    'align-items: flex-end': 'items-end',
    'flex-direction: column': 'flex-col',
    'flex-direction: row': 'flex-row',
    // Text align
    'text-align: center': 'text-center',
    'text-align: left': 'text-left',
    'text-align: right': 'text-right',
    // Width/Height
    'width: 100%': 'w-full',
    'width: 50%': 'w-1/2',
    'width: 33.333%': 'w-1/3',
    'height: 100%': 'h-full',
    'height: 100vh': 'h-screen',
    // Borders
    'border: none': 'border-0',
    'border: 1px solid': 'border',
    'border: 2px solid': 'border-2',
    'border: 4px solid': 'border-4',
    // Shadow
    'box-shadow: 0 1px 3px rgba(0,0,0,0.1)': 'shadow-sm',
    'box-shadow: 0 4px 6px rgba(0,0,0,0.1)': 'shadow',
    'box-shadow: 0 10px 15px rgba(0,0,0,0.1)': 'shadow-lg',
    'box-shadow: 0 20px 25px rgba(0,0,0,0.1)': 'shadow-xl',
};

function parseCSS(css) {
    const lines = css.split('\n');
    const classes = [];
    const unknown = [];
    const warnings = [];

    lines.forEach(line => {
        // Extract property: value pairs
        const match = line.match(/([\w-]+):\s*([^;]+);?/);
        if (match) {
            const prop = match[1].trim().toLowerCase();
            const val = match[2].trim().toLowerCase();
            const key = `${prop}: ${val}`;
            
            if (cssToTailwindMap[key]) {
                classes.push(cssToTailwindMap[key]);
            } else {
                // Try to find approximate match
                let found = false;
                for (const [mapKey, mapVal] of Object.entries(cssToTailwindMap)) {
                    if (mapKey.startsWith(prop + ':')) {
                        warnings.push(`${key} → closest match: ${mapVal}`);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    unknown.push(key);
                }
            }
        }
    });

    return { classes, unknown, warnings };
}

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { css } = req.body || {};

        if (!css || typeof css !== 'string') {
            res.status(400).json({ 
                error: 'Missing or invalid CSS',
                message: 'Please provide a "css" field in the request body'
            });
            return;
        }

        const result = parseCSS(css);

        res.status(200).json({
            success: true,
            input_length: css.length,
            output: result.classes.join(' '),
            classes: result.classes,
            unknown_properties: result.unknown,
            warnings: result.warnings,
            class_count: result.classes.length,
            conversion_quality: result.unknown.length === 0 ? 'complete' : 'partial'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Conversion failed',
            message: error.message
        });
    }
};
