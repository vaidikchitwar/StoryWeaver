import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
        typography: (theme: any) => ({ // Added typography styles
          DEFAULT: {
            css: {
              color: 'hsl(var(--foreground))', // Use theme foreground
               '--tw-prose-body': 'hsl(var(--foreground))',
               '--tw-prose-headings': 'hsl(var(--foreground))',
               '--tw-prose-lead': 'hsl(var(--muted-foreground))',
               '--tw-prose-links': 'hsl(var(--primary))',
               '--tw-prose-bold': 'hsl(var(--foreground))',
               '--tw-prose-counters': 'hsl(var(--muted-foreground))',
               '--tw-prose-bullets': 'hsl(var(--border))',
               '--tw-prose-hr': 'hsl(var(--border))',
               '--tw-prose-quotes': 'hsl(var(--foreground))',
               '--tw-prose-quote-borders': 'hsl(var(--border))',
               '--tw-prose-captions': 'hsl(var(--muted-foreground))',
               '--tw-prose-code': 'hsl(var(--foreground))',
               '--tw-prose-pre-code': 'hsl(var(--card-foreground))',
               '--tw-prose-pre-bg': 'hsl(var(--card))',
               '--tw-prose-th-borders': 'hsl(var(--border))',
               '--tw-prose-td-borders': 'hsl(var(--border))',
               '--tw-prose-invert-body': 'hsl(var(--foreground))', // Use dark foreground
               '--tw-prose-invert-headings': 'hsl(var(--foreground))',
               '--tw-prose-invert-lead': 'hsl(var(--muted-foreground))',
               '--tw-prose-invert-links': 'hsl(var(--primary))',
               '--tw-prose-invert-bold': 'hsl(var(--foreground))',
               '--tw-prose-invert-counters': 'hsl(var(--muted-foreground))',
               '--tw-prose-invert-bullets': 'hsl(var(--border))',
               '--tw-prose-invert-hr': 'hsl(var(--border))',
               '--tw-prose-invert-quotes': 'hsl(var(--foreground))',
               '--tw-prose-invert-quote-borders': 'hsl(var(--border))',
               '--tw-prose-invert-captions': 'hsl(var(--muted-foreground))',
               '--tw-prose-invert-code': 'hsl(var(--foreground))',
               '--tw-prose-invert-pre-code': 'hsl(var(--card-foreground))',
               '--tw-prose-invert-pre-bg': 'hsl(var(--card))',
               '--tw-prose-invert-th-borders': 'hsl(var(--border))',
               '--tw-prose-invert-td-borders': 'hsl(var(--border))',
                p: {
                    // Add default paragraph spacing if needed
                    // marginBottom: theme('spacing.6'),
                },
                a: {
                    fontWeight: '500',
                    textDecoration: 'none',
                     '&:hover': {
                         textDecoration: 'underline',
                         color: 'hsl(var(--primary) / 0.8)', // Slightly lighter on hover
                     },
                },
                // Add more customizations here if needed
            },
          },
           lg: { // Adjust large size if needed
             css: {
               fontSize: theme('fontSize.lg'),
               lineHeight: theme('lineHeight.relaxed'),
             },
           },
        }),
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
        textShadow: { // Add text-shadow utility
           DEFAULT: '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
           sm: '0 1px 2px rgb(0 0 0 / 0.05)',
           md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
           lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
           none: 'none',
         },
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'), // Added typography plugin
     function ({ matchUtilities, theme }: { matchUtilities: any, theme: any }) { // Add text-shadow utility function
       matchUtilities(
         {
           'text-shadow': (value: any) => ({
             textShadow: value,
           }),
         },
         { values: theme('textShadow') }
       )
     },
  ],
} satisfies Config;
