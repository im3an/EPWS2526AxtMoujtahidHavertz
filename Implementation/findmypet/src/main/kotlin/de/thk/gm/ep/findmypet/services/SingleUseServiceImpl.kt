package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.SingleUseRequestDto
import de.thk.gm.ep.findmypet.dtos.SingleUseResponseDto
import de.thk.gm.ep.findmypet.dtos.toResponseDto
import de.thk.gm.ep.findmypet.models.SingleUse
import de.thk.gm.ep.findmypet.repositories.SingleUseRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class SingleUseServiceImpl(
    private val singleUseRepository: SingleUseRepository
): SingleUseService {
    override fun getAll(): List<SingleUseResponseDto> {
        return singleUseRepository.findAll().toList().map { it.toResponseDto() }
    }

    override fun getById(id: UUID): SingleUseResponseDto? {
        return singleUseRepository.findByIdOrNull(id)?.toResponseDto()
    }

    override fun getByName(name: String): SingleUseResponseDto? {
        return singleUseRepository.findByName(name)?.toResponseDto()
    }

    @Transactional
    override fun save(singleUseRequestDto: SingleUseRequestDto): SingleUseResponseDto {
        val singleUse = SingleUse(
            name = singleUseRequestDto.name,
            nr = generatePin()
        )

        return singleUseRepository.save(singleUse).toResponseDto()
    }

    @Transactional
    override fun update(singleUseRequestDto: SingleUseRequestDto, singleUseId: UUID): SingleUseResponseDto {
        val singleUse = singleUseRepository.findByIdOrNull(singleUseId) ?: throw NoSuchElementException("SingleUse with id $singleUseId not found")
        singleUse.apply {
            name = singleUseRequestDto.name
        }

        return singleUseRepository.save(singleUse).toResponseDto()
    }

    @Transactional
    override fun delete(singleUseId: UUID) {
        singleUseRepository.deleteById(singleUseId)
    }

    private fun generatePin(): Int {
        return (1000..9999).random()
    }


}