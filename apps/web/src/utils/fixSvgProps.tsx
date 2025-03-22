import React from 'react';

// Function to render SVG with proper React camelCase props
export function FixedSVG({ children, ...props }: React.SVGProps<SVGSVGElement>) {
    // Create a new children array with fixed props
    const fixedChildren = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            // Convert props like stroke-width to strokeWidth
            const newProps = {};
            Object.entries(child.props).forEach(([key, value]) => {
                if (key.includes('-')) {
                    // Convert kebab-case to camelCase
                    const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                    newProps[camelKey] = value;
                } else {
                    newProps[key] = value;
                }
            });
            
            return React.cloneElement(child, newProps);
        }
        return child;
    });
    
    return <svg {...props}>{fixedChildren}</svg>;
} 