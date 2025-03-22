import "../preview.styles.css"
export function Preview({ value }: { value: string }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: value }} className="ui-text-brand-lightblack ui-text-sm" style={{
            color: "#51697f",
            fontSize: '14px'
        }} id="preview_div" />
    )
}