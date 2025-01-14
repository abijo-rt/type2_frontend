import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "../theme";
import { Contrast } from "@mui/icons-material";
import { ThemeName, themes } from "@/lib/theme";

const ThemeChanger = () => {
    const { currentTheme, changeTheme } = useTheme();

    const renderThemeOptions = () =>
        Object.values(themes).map((theme) => (
            <div
                key={theme.name}
                role="button"
                tabIndex={0}
                onClick={() => changeTheme(theme.name as ThemeName)}
                onKeyDown={(e) => {
                    e.preventDefault();
                    if (e.key === "Enter" || e.key === " ") {
                        changeTheme(theme.name as ThemeName);
                    }
                }}
                className={`flex flex-row items-center p-5 rounded-md w-full h-16 
                    ${theme.background} ${theme.text} text-4xl 
                    cursor-pointer hover:opacity-90 transition-opacity`}
                aria-label={`Switch to ${theme.name} theme`}
            >
                {theme.name}
            </div>
        ));

    return (
        <Dialog>
            <DialogTrigger>
                <Contrast fontSize="large" className={`${currentTheme.text}`} />
            </DialogTrigger>
            <DialogContent className={`${currentTheme.background}`}>
                <DialogHeader>
                    <DialogTitle className={`${currentTheme.text}`}>
                        Theme Changer
                    </DialogTitle>
                    <div className="h-96 space-y-4 overflow-y-scroll">
                        {renderThemeOptions()}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ThemeChanger;
