package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.SingleUseDto
import de.thk.gm.ep.findmypet.models.SingleUse
import de.thk.gm.ep.findmypet.services.SingleUseService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.UUID

@RestController
@RequestMapping("/api/v1/accounts/singleUse")
class SingleUseRestController(
    private val singleUseService: SingleUseService
) {

    @PostMapping
    fun saveSingleUse(
        @Valid @RequestBody singleUseDto: SingleUseDto
    ): SingleUse {
        val singleUse = SingleUse(
            singleUseDto.creationDate,
            singleUseDto.nr
        )
        return singleUseService.save(singleUse)
    }

    @GetMapping
    fun getSingleUses(): List<SingleUse> {
        return singleUseService.getAll()
    }

    @GetMapping("/{singleUseId}")
    fun getSingleUse(
        @PathVariable("singleUseId") singleUseId: UUID
    ): SingleUse {
        return singleUseService.getById(singleUseId) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{singleUseId}")
    fun updateSingleUse(
        @PathVariable("singleUseId") singleUseId: UUID,
        @Valid @RequestBody singleUseDto: SingleUseDto
    ){
        val singleUse = singleUseService.getById(singleUseId)
        singleUse?.let {
            it.nr = singleUseDto.nr
            singleUseService.save(singleUse)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "SingleUse not found")
    }

    @DeleteMapping("/{singleUseId}")
    fun deleteSingleUse(@PathVariable("singleUseId") singleUseId: UUID) {
        val singleUse = singleUseService.getById(singleUseId)
        singleUse?.let {
            singleUseService.delete(it)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "SingleUse not found")
    }

}