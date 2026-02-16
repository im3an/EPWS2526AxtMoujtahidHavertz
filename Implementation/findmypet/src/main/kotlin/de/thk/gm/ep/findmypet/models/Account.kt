package de.thk.gm.ep.findmypet.models

import jakarta.persistence.*
import java.time.LocalDate
import java.util.UUID

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "account_type", discriminatorType = DiscriminatorType.STRING)
abstract class Account(
    @Column(unique = true, nullable = false)
    var name: String,

    @Column(updatable = false, nullable = false)
    val creationDate: LocalDate = LocalDate.now()
) {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    val id: UUID? = null
}