import { Phone, Check, Linkedin, Globe, Facebook, Instagram } from 'lucide-react'
export default function Footer() {
    return(
        <footer className="bg-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
                    <div className="text-[#1e3a5f]">
                    <p className="font-semibold mb-2">Ventas</p>
                    <a
                        href="https://wa.me/523315179175"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 group hover:text-[#1e3a5f] transition-colors duration-300"
                    >
                        <Phone className="w-5 h-5 text-[#1e3a5f] group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-[#1e3a5f] group-hover:text-[#1e3a5f]">(33) 15179175</span>
                    </a>
                    </div>
        
                    <div className="flex justify-center">
                    <div className="text-[#1e3a5f] text-10xl font-bold flex flex-col items-center gap-1">
                        <img src="Nommy.png" alt="Nommy Logo" className="w-24 h-24" />
                    </div>
                    </div>
        
                    <div className="text-[#1e3a5f] text-right">
                    <p className="font-semibold mb-2 text-[#1e3a5f]">Email</p>
                    <p>ventas@nommy.mx</p>
                    </div>
                </div>
        
                <div className="border-t border-[#4db8c4] pt-8">
                    <div className="flex justify-between items-center">
                    <a
                        href="https://drive.google.com/file/d/1cFTxtE8PW_hOgmomy2i56W1SArO7J-dV/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-left font-bold space-x-3 group hover:text-[#1e3a5f] transition-colors duration-300"
                    >Términos y condiciones</a>
                    <a
                        className="hover:text-[#1e3a5f] transition-colors duration-300 text-sm mt-2 sm:mt-0"
                        href="/terminos"
                        target="_blank"
                        rel="noopener noreferrer"
                        
                        >Aviso de privacidad</a>
                    <div className="flex gap-4">
                        <a
                        href="/aviso"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#4db8c4] rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                        >
                        <Linkedin className="w-5 h-5 text-white" />
                        </a>
                        
                        <a
                        href="https://www.facebook.com/profile.php?id=61578598203669"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#4db8c4] rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                        >
                        <Facebook className="w-5 h-5 text-white" />
                        </a>
                        <a
                        href="https://www.instagram.com/nommymexico/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#4db8c4] rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                        >
                        <Instagram className="w-5 h-5 text-white" />
                        </a>
                        
                    </div>
                    </div>
                </div>
                </div>
            </footer>
    )
}