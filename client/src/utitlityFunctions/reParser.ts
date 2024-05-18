

export default function reParser(obj: any) {
    return JSON.parse(JSON.stringify(obj))
}