package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.SingleUseRequestDto
import de.thk.gm.ep.findmypet.dtos.SingleUseResponseDto
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
    @ResponseStatus(HttpStatus.CREATED)
    fun saveSingleUse(
        @Valid @RequestBody singleUseRequestDto: SingleUseRequestDto
    ): SingleUseResponseDto {
       return singleUseService.save(singleUseRequestDto)
    }

    @GetMapping
    fun getSingleUses(): List<SingleUseResponseDto> {
        return singleUseService.getAll()
    }

    @GetMapping("/{singleUseId}")
    fun getSingleUse(
        @PathVariable("singleUseId") singleUseId: UUID
    ): SingleUseResponseDto {
        return singleUseService.getById(singleUseId) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{singleUseId}")
    fun updateSingleUse(
        @PathVariable("singleUseId") singleUseId: UUID,
        @Valid @RequestBody singleUseRequestDto: SingleUseRequestDto
    ): SingleUseResponseDto {
        return singleUseService.update(singleUseRequestDto, singleUseId)
    }

    @DeleteMapping("/{singleUseId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteSingleUse(@PathVariable("singleUseId") singleUseId: UUID) {
        singleUseService.delete(singleUseId)
    }

}