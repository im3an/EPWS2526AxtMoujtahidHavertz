package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.SingleUse
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface SingleUseRepository: CrudRepository<SingleUse, UUID> {
    fun findByName(name: String): SingleUse?
}