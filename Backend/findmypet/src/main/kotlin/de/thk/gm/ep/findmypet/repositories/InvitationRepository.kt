package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.Invitation
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface InvitationRepository: JpaRepository<Invitation, UUID>{
    fun findByToken(token: String): Invitation?

}