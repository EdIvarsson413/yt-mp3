
export default function Loader() {
    return (
        <div>
            {/* Display loader based in theme */}
            <div className="folding dark:hidden block">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>

            <div className="folding-dark hidden dark:block">
                <div className="sk-cube1 sk-cube-dark"></div>
                <div className="sk-cube2 sk-cube-dark"></div>
                <div className="sk-cube4 sk-cube-dark"></div>
                <div className="sk-cube3 sk-cube-dark"></div>
            </div>
            <h3 className="mt-8 text-center scroll-m-20 text-2xl font-light tracking-tight">
                Links enviados al servidor, esto puede tardar...
            </h3>
        </div>
    )
}