package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.Account
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface AccountRepository : CrudRepository<Account, UUID> {
}