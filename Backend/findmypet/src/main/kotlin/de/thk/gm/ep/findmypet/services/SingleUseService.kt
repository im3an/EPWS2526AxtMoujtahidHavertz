package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.SingleUseRequestDto
import de.thk.gm.ep.findmypet.dtos.SingleUseResponseDto

import java.util.UUID

interface SingleUseService {

    fun getAll(): List<SingleUseResponseDto>
    fun getById(id:UUID):SingleUseResponseDto?
    fun getByName(name:String):SingleUseResponseDto?
    fun save(singleUseRequestDto: SingleUseRequestDto): SingleUseResponseDto
    fun update(singleUseRequestDto: SingleUseRequestDto, singleUseId: UUID): SingleUseResponseDto
    fun delete(singleUseId: UUID)

}