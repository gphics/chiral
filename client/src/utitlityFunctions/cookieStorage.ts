import Cookie from "js-cookie"


class Ops {
    storeName = "mgt"

    isExist(): boolean {
        const first = Cookie.get("mgt")
        return !!first
    }

    remove(): void {
        Cookie.remove(this.storeName)
    }

    add(value: string) {
        Cookie.set(this.storeName, value, { expires: 365 })
    }
}



const cookieStorage = new Ops()
export default cookieStorage