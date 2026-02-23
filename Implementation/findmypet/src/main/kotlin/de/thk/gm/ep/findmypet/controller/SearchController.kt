package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.enums.AgeRange
import de.thk.gm.ep.findmypet.enums.PetColor
import de.thk.gm.ep.findmypet.enums.PetSize
import de.thk.gm.ep.findmypet.enums.Species
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/search")
class SearchViewController {

    @GetMapping
    fun showSearchView(model: Model): String {
        model.addAttribute("speciesList", Species.entries.toTypedArray())
        model.addAttribute("colorList", PetColor.entries.toTypedArray())
        model.addAttribute("sizeList", PetSize.entries.toTypedArray())
        model.addAttribute("ageList", AgeRange.entries.toTypedArray())

        return "search"
    }
}