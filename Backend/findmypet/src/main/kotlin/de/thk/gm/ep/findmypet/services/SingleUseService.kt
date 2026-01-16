package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.SingleUse
import org.springframework.stereotype.Service
import java.util.UUID

@Service
interface SingleUseService {

    fun getAll(): List<SingleUse>
    fun getById(id:UUID):SingleUse?
    fun getByName(name:String):SingleUse?
    fun save(singleUse: SingleUse): SingleUse
    fun delete(singleUse: SingleUse)

}