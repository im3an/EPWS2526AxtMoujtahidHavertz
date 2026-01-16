package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.Account
import org.springframework.stereotype.Service
import java.util.UUID

@Service
interface AccountService {
    fun getAll(): List<Account>
    fun getById(id: UUID): Account?

}